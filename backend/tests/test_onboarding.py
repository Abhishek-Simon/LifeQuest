import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_onboarding_state(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "onb1@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "onb1@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    
    res = await client.get("/api/v1/onboarding", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.json()
    assert "id" in data
    assert data["is_complete"] is False

@pytest.mark.asyncio
async def test_update_onboarding_state(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "onb2@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "onb2@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    
    update_data = {
        "ambition": "Become a Software Engineer",
        "playstyle": "Strategist",
        "adventure_path": "Code Mastery",
        "selected_attributes": {"intellect": 18, "discipline": 15}
    }
    res = await client.patch("/api/v1/onboarding", json=update_data, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    data = res.json()
    assert data["ambition"] == "Become a Software Engineer"
    assert data["playstyle"] == "Strategist"

@pytest.mark.asyncio
async def test_complete_onboarding(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "onb3@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "onb3@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    
    update_data = {
        "ambition": "Become a Software Engineer",
        "selected_attributes": {"intellect": 18, "discipline": 15},
        "character_name": "TestChar"
    }
    await client.patch("/api/v1/onboarding", json=update_data, headers={"Authorization": f"Bearer {token}"})
    
    res = await client.post("/api/v1/onboarding/complete", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    
    # Try completing again should fail
    res2 = await client.post("/api/v1/onboarding/complete", headers={"Authorization": f"Bearer {token}"})
    assert res2.status_code == 400
    
    # Verify character was created
    char_res = await client.get("/api/v1/character", headers={"Authorization": f"Bearer {token}"})
    assert char_res.status_code == 200
    char_data = char_res.json()
    assert char_data["name"] == "TestChar"
    assert char_data["intellect"] == 18
