from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from typing import List
from datetime import datetime, timezone
import uuid

from app.core.database import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.quest import Quest, QuestStatus
from app.schemas.quest import QuestCreate, QuestUpdate, QuestResponse

router = APIRouter()

@router.post("", response_model=QuestResponse, status_code=status.HTTP_201_CREATED)
async def create_quest(
    quest_in: QuestCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Create a new quest for the current user.
    """
    quest = Quest(
        **quest_in.model_dump(),
        user_id=current_user.id,
        # Mock calculation of preview rewards based on difficulty
        xp_reward_preview=100 if quest_in.difficulty.lower() == "hard" else 50,
        gold_reward_preview=20 if quest_in.difficulty.lower() == "hard" else 10,
    )
    db.add(quest)
    await db.commit()
    await db.refresh(quest)
    return quest

@router.get("", response_model=List[QuestResponse])
async def list_quests(
    status: str | None = None,
    category: str | None = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    List quests for the current user, optionally filtered by status or category.
    """
    query = select(Quest).where(Quest.user_id == current_user.id)
    
    if status and status.lower() != "all":
        query = query.where(Quest.status == status)
    if category and category.lower() != "all":
        query = query.where(Quest.category == category)
        
    query = query.order_by(desc(Quest.created_at))
    
    result = await db.execute(query)
    quests = result.scalars().all()
    return quests

@router.get("/{quest_id}", response_model=QuestResponse)
async def get_quest(
    quest_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Get a specific quest by ID, if owned by current user.
    """
    result = await db.execute(
        select(Quest).where(Quest.id == quest_id, Quest.user_id == current_user.id)
    )
    quest = result.scalar_one_or_none()
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")
    return quest

@router.patch("/{quest_id}", response_model=QuestResponse)
async def update_quest(
    quest_id: uuid.UUID,
    quest_in: QuestUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Update a quest.
    """
    result = await db.execute(
        select(Quest).where(Quest.id == quest_id, Quest.user_id == current_user.id)
    )
    quest = result.scalar_one_or_none()
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")
        
    update_data = quest_in.model_dump(exclude_unset=True)
    
    # Handle completion logic manually for mock frontend completion
    if "status" in update_data:
        if update_data["status"] == QuestStatus.COMPLETED and quest.status != QuestStatus.COMPLETED:
            quest.completed_at = datetime.now(timezone.utc)
        elif update_data["status"] == QuestStatus.FAILED and quest.status != QuestStatus.FAILED:
            quest.failed_at = datetime.now(timezone.utc)
            
    for field, value in update_data.items():
        setattr(quest, field, value)
        
    await db.commit()
    await db.refresh(quest)
    return quest

@router.delete("/{quest_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_quest(
    quest_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """
    Delete a quest.
    """
    result = await db.execute(
        select(Quest).where(Quest.id == quest_id, Quest.user_id == current_user.id)
    )
    quest = result.scalar_one_or_none()
    if not quest:
        raise HTTPException(status_code=404, detail="Quest not found")
        
    await db.delete(quest)
    await db.commit()
