import pytest
from httpx import AsyncClient
import uuid

@pytest.mark.asyncio
async def test_create_quest(client: AsyncClient):
    # Setup user
    await client.post("/api/v1/auth/signup", json={"email": "q1@example.com", "password": "password"})
    login_res = await client.post("/api/v1/auth/login", json={"email": "q1@example.com", "password": "password"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create quest
    quest_data = {
        "title": "My First Quest",
        "description": "A description",
        "category": "Health",
        "difficulty": "Easy",
        "attribute": "endurance"
    }
    res = await client.post("/api/v1/quests", json=quest_data, headers=headers)
    assert res.status_code == 201
    data = res.json()
    assert data["title"] == "My First Quest"
    assert data["status"] == "available"
    assert "id" in data
    
@pytest.mark.asyncio
async def test_get_quests(client: AsyncClient):
    # User 1
    await client.post("/api/v1/auth/signup", json={"email": "q2_1@example.com", "password": "password"})
    login_res1 = await client.post("/api/v1/auth/login", json={"email": "q2_1@example.com", "password": "password"})
    token1 = login_res1.json()["access_token"]
    headers1 = {"Authorization": f"Bearer {token1}"}
    
    # User 2
    await client.post("/api/v1/auth/signup", json={"email": "q2_2@example.com", "password": "password"})
    login_res2 = await client.post("/api/v1/auth/login", json={"email": "q2_2@example.com", "password": "password"})
    token2 = login_res2.json()["access_token"]
    headers2 = {"Authorization": f"Bearer {token2}"}
    
    # Create quest for User 1
    await client.post("/api/v1/quests", json={"title": "U1 Quest", "category": "Health", "difficulty": "Easy", "attribute": "endurance"}, headers=headers1)
    
    # Get quests for User 1
    res1 = await client.get("/api/v1/quests", headers=headers1)
    assert res1.status_code == 200
    assert len(res1.json()) == 1
    assert res1.json()[0]["title"] == "U1 Quest"
    
    # Get quests for User 2 (should be 0)
    res2 = await client.get("/api/v1/quests", headers=headers2)
    assert res2.status_code == 200
    assert len(res2.json()) == 0

@pytest.mark.asyncio
async def test_get_single_quest_idor(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "q3_1@example.com", "password": "password"})
    token1 = (await client.post("/api/v1/auth/login", json={"email": "q3_1@example.com", "password": "password"})).json()["access_token"]
    
    await client.post("/api/v1/auth/signup", json={"email": "q3_2@example.com", "password": "password"})
    token2 = (await client.post("/api/v1/auth/login", json={"email": "q3_2@example.com", "password": "password"})).json()["access_token"]
    
    # User 1 creates quest
    res = await client.post("/api/v1/quests", json={"title": "U1Q", "category": "Health", "difficulty": "Easy", "attribute": "endurance"}, headers={"Authorization": f"Bearer {token1}"})
    quest_id = res.json()["id"]
    
    # User 2 tries to get User 1's quest
    res2 = await client.get(f"/api/v1/quests/{quest_id}", headers={"Authorization": f"Bearer {token2}"})
    assert res2.status_code == 404

@pytest.mark.asyncio
async def test_update_quest(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "q4@example.com", "password": "password"})
    token = (await client.post("/api/v1/auth/login", json={"email": "q4@example.com", "password": "password"})).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    res = await client.post("/api/v1/quests", json={"title": "Old Title", "category": "Health", "difficulty": "Easy", "attribute": "endurance"}, headers=headers)
    quest_id = res.json()["id"]
    
    # Update title
    update_res = await client.patch(f"/api/v1/quests/{quest_id}", json={"title": "New Title", "status": "completed"}, headers=headers)
    print(update_res.text)
    assert update_res.status_code == 200
    assert update_res.json()["title"] == "New Title"
    assert update_res.json()["status"] == "completed"

@pytest.mark.asyncio
async def test_delete_quest_idor(client: AsyncClient):
    await client.post("/api/v1/auth/signup", json={"email": "q5_1@example.com", "password": "password"})
    token1 = (await client.post("/api/v1/auth/login", json={"email": "q5_1@example.com", "password": "password"})).json()["access_token"]
    
    await client.post("/api/v1/auth/signup", json={"email": "q5_2@example.com", "password": "password"})
    token2 = (await client.post("/api/v1/auth/login", json={"email": "q5_2@example.com", "password": "password"})).json()["access_token"]
    
    # User 1 creates
    res = await client.post("/api/v1/quests", json={"title": "Q", "category": "Health", "difficulty": "Easy", "attribute": "endurance"}, headers={"Authorization": f"Bearer {token1}"})
    quest_id = res.json()["id"]
    
    # User 2 tries to delete
    res2 = await client.delete(f"/api/v1/quests/{quest_id}", headers={"Authorization": f"Bearer {token2}"})
    assert res2.status_code == 404
    
    # User 1 deletes
    res3 = await client.delete(f"/api/v1/quests/{quest_id}", headers={"Authorization": f"Bearer {token1}"})
    assert res3.status_code == 204
    
    # Ensure deleted
    res4 = await client.get(f"/api/v1/quests/{quest_id}", headers={"Authorization": f"Bearer {token1}"})
    assert res4.status_code == 404
