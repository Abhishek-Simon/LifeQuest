import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base

class OnboardingState(Base):
    __tablename__ = "onboarding_states"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, index=True)
    
    # Onboarding Fields
    ambition: Mapped[str | None] = mapped_column(String, nullable=True)
    goal_description: Mapped[str | None] = mapped_column(String, nullable=True)
    deadline: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    daily_commitment: Mapped[str | None] = mapped_column(String, nullable=True)
    difficulty: Mapped[str | None] = mapped_column(String, nullable=True)
    weak_areas: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    adventure_path: Mapped[str | None] = mapped_column(String, nullable=True)
    selected_attributes: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    character_name: Mapped[str | None] = mapped_column(String, nullable=True)
    playstyle: Mapped[str | None] = mapped_column(String, nullable=True)
    
    is_complete: Mapped[bool] = mapped_column(Boolean, default=False)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
