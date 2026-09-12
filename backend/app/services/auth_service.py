from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password

async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
    stmt = select(User).where(User.email == email)
    result = await session.execute(stmt)
    return result.scalars().first()

async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    # Normalize email
    normalized_email = user_in.email.lower().strip()
    
    db_user = User(
        email=normalized_email,
        password_hash=get_password_hash(user_in.password)
    )
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user

async def authenticate_user(session: AsyncSession, email: str, password: str) -> Optional[User]:
    user = await get_user_by_email(session, email.lower().strip())
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
