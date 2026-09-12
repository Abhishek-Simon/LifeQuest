from app.models.base import Base
from app.models.user import User
from app.models.character import Character
from app.models.onboarding import OnboardingState
from app.models.quest import Quest

# Expose models for Alembic to auto-discover
__all__ = ["Base", "User", "Character", "OnboardingState", "Quest"]
