from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.models.user import User
from app.models.character import Character
from app.schemas.character import CharacterResponse
from app.api.deps import get_current_active_user

router = APIRouter()

@router.get("", response_model=CharacterResponse)
async def get_character(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Get the current user's character.
    """
    result = await db.execute(select(Character).filter(Character.user_id == current_user.id))
    character = result.scalars().first()
    
    if not character:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Character not found"
        )
    return character

@router.post("", response_model=CharacterResponse)
async def create_character(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Create a default character for the current user.
    """
    result = await db.execute(select(Character).filter(Character.user_id == current_user.id))
    character = result.scalars().first()
    
    if character:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Character already exists"
        )
        
    character = Character(
        user_id=current_user.id,
        name=current_user.email.split("@")[0].capitalize(),
        level=1,
    )
    db.add(character)
    await db.commit()
    await db.refresh(character)
    return character

from app.schemas.character import CharacterUpdate

@router.patch("", response_model=CharacterResponse)
async def update_character(
    update_data: CharacterUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Update the current user's character.
    """
    result = await db.execute(select(Character).filter(Character.user_id == current_user.id))
    character = result.scalars().first()
    
    if not character:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Character not found"
        )
        
    update_dict = update_data.model_dump(exclude_unset=True) if hasattr(update_data, "model_dump") else update_data.dict(exclude_unset=True)
    
    for key, value in update_dict.items():
        setattr(character, key, value)
        
    await db.commit()
    await db.refresh(character)
    return character
