import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base

class Character(Base):
    __tablename__ = "characters"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    
    # Core stats
    level: Mapped[int] = mapped_column(Integer, default=1)
    xp: Mapped[int] = mapped_column(Integer, default=0)
    gold: Mapped[int] = mapped_column(Integer, default=0)
    streak: Mapped[int] = mapped_column(Integer, default=0)
    
    # Attributes
    strength: Mapped[int] = mapped_column(Integer, default=10)
    intellect: Mapped[int] = mapped_column(Integer, default=10)
    endurance: Mapped[int] = mapped_column(Integer, default=10)
    wisdom: Mapped[int] = mapped_column(Integer, default=10)
    creativity: Mapped[int] = mapped_column(Integer, default=10)
    discipline: Mapped[int] = mapped_column(Integer, default=10)
    
    # Metadata
    title: Mapped[str | None] = mapped_column(String, nullable=True)
    playstyle: Mapped[str | None] = mapped_column(String, nullable=True)
    archetype: Mapped[str | None] = mapped_column(String, nullable=True)
    specialization: Mapped[str | None] = mapped_column(String, nullable=True)
    adventure_path: Mapped[str | None] = mapped_column(String, nullable=True)
    chapter_id: Mapped[int] = mapped_column(Integer, default=1)
    avatarUrl: Mapped[str | None] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
