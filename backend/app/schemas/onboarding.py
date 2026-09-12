from pydantic import BaseModel
import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any

class OnboardingStateBase(BaseModel):
    ambition: Optional[str] = None
    goal_description: Optional[str] = None
    deadline: Optional[datetime] = None
    daily_commitment: Optional[str] = None
    difficulty: Optional[str] = None
    weak_areas: Optional[List[str]] = None
    adventure_path: Optional[str] = None
    selected_attributes: Optional[Dict[str, int]] = None
    character_name: Optional[str] = None
    playstyle: Optional[str] = None

class OnboardingStateUpdate(OnboardingStateBase):
    pass

class OnboardingStateResponse(OnboardingStateBase):
    id: uuid.UUID
    user_id: uuid.UUID
    is_complete: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
