import os
from app.core.config import Settings

def test_settings_load():
    """Test that settings load with default values when env vars are missing (if defaults exist)
    or loads properly with env vars.
    """
    os.environ["DATABASE_URL"] = "postgresql+asyncpg://test:test@localhost:5432/test_db"
    
    settings = Settings()
    
    assert settings.DATABASE_URL == "postgresql+asyncpg://test:test@localhost:5432/test_db"
    assert settings.ENVIRONMENT in ["development", "production", "test"]
    assert settings.JWT_ALGORITHM == "HS256"
