import asyncio
import sys
import os

# Add parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text
from app.core.database import engine

async def verify_connection():
    try:
        print("Attempting to connect to the database...")
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            val = result.scalar()
            if val == 1:
                print("✅ Successfully connected to the database!")
                return 0
    except Exception as e:
        print("❌ Failed to connect to the database.")
        print(f"Error details:\n{e}")
        return 1
    finally:
        await engine.dispose()

if __name__ == "__main__":
    exit_code = asyncio.run(verify_connection())
    sys.exit(exit_code)
