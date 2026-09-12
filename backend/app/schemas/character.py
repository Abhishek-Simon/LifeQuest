from pydantic import BaseModel
import uuid
from datetime import datetime
from typing import Optional

class CharacterBase(BaseModel):
    name: str
    
class CharacterCreate(CharacterBase):
    pass

class CharacterResponse(CharacterBase):
    id: uuid.UUID
    user_id: uuid.UUID
    
    level: int
    xp: int
    gold: int
    streak: int
    
    strength: int
    intellect: int
    endurance: int
    wisdom: int
    creativity: int
    discipline: int
    
    title: Optional[str] = None
    playstyle: Optional[str] = None
    archetype: Optional[str] = None
    specialization: Optional[str] = None
    adventure_path: Optional[str] = None
    chapter_id: int
    avatarUrl: Optional[str] = None
    
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class CharacterUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    playstyle: Optional[str] = None
    archetype: Optional[str] = None
    specialization: Optional[str] = None
    adventure_path: Optional[str] = None
    chapter_id: Optional[int] = None
    avatarUrl: Optional[str] = None
