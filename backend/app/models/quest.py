import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, Text, ForeignKey, DateTime, Enum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from app.models.base import Base
import enum

from sqlalchemy.dialects.postgresql import UUID

class QuestStatus(str, enum.Enum):
    AVAILABLE = "available"
    ACTIVE = "active"
    COMPLETED = "completed"
    FAILED = "failed"
    LOCKED = "locked"
    ARCHIVED = "archived"

class Quest(Base):
    __tablename__ = "quests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(50), nullable=False)
    attribute: Mapped[str] = mapped_column(String(50), nullable=False)
    
    status: Mapped[QuestStatus] = mapped_column(String(20), default=QuestStatus.AVAILABLE, nullable=False)
    
    priority: Mapped[str] = mapped_column(String(20), default="normal", nullable=False)
    estimated_minutes: Mapped[int] = mapped_column(Integer, default=0, nullable=False) # corresponds to duration
    energy_cost: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    # Preview rewards for display only
    xp_reward_preview: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    gold_reward_preview: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    due_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    scheduled_date: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    failed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        Index('ix_quests_user_status', "user_id", "status"),
    )
