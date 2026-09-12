import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_character_not_found(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "char1@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "char1@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    
    res = await client.get("/api/v1/character", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 404

@pytest.mark.asyncio
async def test_create_character(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "char2@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "char2@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    
    res = await client.post("/api/v1/character", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Char2"
    assert data["level"] == 1
    
    # Try creating again should fail
    res2 = await client.post("/api/v1/character", headers={"Authorization": f"Bearer {token}"})
    assert res2.status_code == 400

@pytest.mark.asyncio
async def test_update_character(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "char3@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "char3@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    
    # Create first
    await client.post("/api/v1/character", headers={"Authorization": f"Bearer {token}"})
    
    update_data = {
        "title": "Master",
        "playstyle": "Aggressive",
        "adventure_path": "Warrior"
    }
    res = await client.patch("/api/v1/character", json=update_data, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.json()
    assert data["title"] == "Master"
    assert data["playstyle"] == "Aggressive"
    assert data["adventure_path"] == "Warrior"
