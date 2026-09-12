from fastapi import APIRouter
from app.api.v1 import health, auth, character, onboarding, quests

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(character.router, prefix="/character", tags=["character"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(quests.router, prefix="/quests", tags=["quests"])
# Future routers will be registered here:
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
