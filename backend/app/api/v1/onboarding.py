from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.user import User
from app.models.onboarding import OnboardingState
from app.models.character import Character
from app.schemas.onboarding import OnboardingStateResponse, OnboardingStateUpdate
from app.api.deps import get_current_active_user

router = APIRouter()

@router.get("", response_model=OnboardingStateResponse)
async def get_onboarding_state(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(OnboardingState).filter(OnboardingState.user_id == current_user.id))
    state = result.scalars().first()
    
    if not state:
        state = OnboardingState(user_id=current_user.id)
        db.add(state)
        await db.commit()
        await db.refresh(state)
    return state

@router.patch("", response_model=OnboardingStateResponse)
async def update_onboarding_state(
    update_data: OnboardingStateUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(OnboardingState).filter(OnboardingState.user_id == current_user.id))
    state = result.scalars().first()
    
    if not state:
        state = OnboardingState(user_id=current_user.id)
        db.add(state)
    
    # Use model_dump for Pydantic v2 or dict for v1
    update_dict = update_data.model_dump(exclude_unset=True) if hasattr(update_data, "model_dump") else update_data.dict(exclude_unset=True)
    
    for key, value in update_dict.items():
        setattr(state, key, value)
        
    await db.commit()
    await db.refresh(state)
    return state

@router.post("/complete")
async def complete_onboarding(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    if current_user.has_completed_onboarding:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Onboarding already completed")
        
    result = await db.execute(select(OnboardingState).filter(OnboardingState.user_id == current_user.id))
    state = result.scalars().first()
    
    if not state:
        state = OnboardingState(user_id=current_user.id)
        db.add(state)
        
    stats = {
        "strength": 10,
        "intellect": 10,
        "endurance": 10,
        "wisdom": 10,
        "creativity": 10,
        "discipline": 10,
    }
    
    if state.selected_attributes:
        for attr, val in state.selected_attributes.items():
            if attr in stats and isinstance(val, (int, float)):
                stats[attr] = max(1, min(100, int(val)))
                
    name = state.character_name or current_user.email.split("@")[0].capitalize()
    
    character = Character(
        user_id=current_user.id,
        name=name,
        level=1,
        title="LVL 1 Novice",
        specialization="Adventurer",
        archetype="Generalist Protocol",
        adventure_path=state.adventure_path or "Unknown Quest",
        playstyle=state.playstyle,
        strength=stats["strength"],
        intellect=stats["intellect"],
        endurance=stats["endurance"],
        wisdom=stats["wisdom"],
        creativity=stats["creativity"],
        discipline=stats["discipline"],
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBXJInTLSuZMWrDJkU8lYaAdeuj_PLWlAqg0gGN-0xzzCPxxeIILvjVKUC_OnQ8guwfGD4A1dOh7Y4ZQjrtIZWNIVJgiLhXHip14a_ELgs1zalY-VkVlrI9iXXrAr3uruCaUYtmbBNjhbtRY_f7ageT7Drj7XK9ia-6OwlX3uiyE-xsqqWnMeJMeknYT7ghZGoEoiFeB_O5cna6sSNzmGWnpzVXmO7aNIve01aWQ7XJHkuHCLkgHodD7A"
    )
    
    state.is_complete = True
    current_user.has_completed_onboarding = True
    
    db.add(character)
    await db.commit()
    
    return {"message": "Onboarding completed successfully"}
