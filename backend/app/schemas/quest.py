from pydantic import BaseModel, Field, constr
from typing import Optional
from datetime import datetime
from app.models.quest import QuestStatus

class QuestBase(BaseModel):
    title: constr(min_length=1, max_length=255)
    description: Optional[str] = ""
    category: str
    difficulty: str
    attribute: str
    priority: Optional[str] = "normal"
    estimated_minutes: Optional[int] = 0
    energy_cost: Optional[int] = 0
    due_at: Optional[datetime] = None
    scheduled_date: Optional[datetime] = None

class QuestCreate(QuestBase):
    pass

class QuestUpdate(BaseModel):
    title: Optional[constr(min_length=1, max_length=255)] = None
    description: Optional[str] = None
    category: Optional[str] = None
    difficulty: Optional[str] = None
    attribute: Optional[str] = None
    priority: Optional[str] = None
    estimated_minutes: Optional[int] = None
    energy_cost: Optional[int] = None
    due_at: Optional[datetime] = None
    scheduled_date: Optional[datetime] = None
    status: Optional[QuestStatus] = None

import uuid

class QuestResponse(QuestBase):
    id: uuid.UUID
    user_id: uuid.UUID
    status: QuestStatus
    xp_reward_preview: int
    gold_reward_preview: int
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None
    failed_at: Optional[datetime] = None

    model_config = {
        "from_attributes": True
    }
