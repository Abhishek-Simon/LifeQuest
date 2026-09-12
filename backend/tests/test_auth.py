import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_signup(client: AsyncClient):
    response = await client.post(
        "/api/v1/auth/signup",
        json={"email": "test@example.com", "password": "securepassword"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "password_hash" not in data

@pytest.mark.asyncio
async def test_signup_duplicate(client: AsyncClient):
    await client.post(
        "/api/v1/auth/signup",
        json={"email": "dup@example.com", "password": "securepassword"}
    )
    response = await client.post(
        "/api/v1/auth/signup",
        json={"email": "dup@example.com", "password": "securepassword"}
    )
    assert response.status_code == 409

@pytest.mark.asyncio
async def test_login_success(client: AsyncClient):
    await client.post(
        "/api/v1/auth/signup",
        json={"email": "login@example.com", "password": "securepassword"}
    )
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "login@example.com", "password": "securepassword"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_login_invalid_password(client: AsyncClient):
    await client.post(
        "/api/v1/auth/signup",
        json={"email": "login2@example.com", "password": "securepassword"}
    )
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "login2@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_me_with_token(client: AsyncClient):
    await client.post(
        "/api/v1/auth/signup",
        json={"email": "me@example.com", "password": "securepassword"}
    )
    login_resp = await client.post(
        "/api/v1/auth/login",
        json={"email": "me@example.com", "password": "securepassword"}
    )
    token = login_resp.json()["access_token"]
    
    me_resp = await client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert me_resp.status_code == 200
    data = me_resp.json()
    assert data["email"] == "me@example.com"

@pytest.mark.asyncio
async def test_me_without_token(client: AsyncClient):
    me_resp = await client.get("/api/v1/auth/me")
    assert me_resp.status_code == 401

@pytest.mark.asyncio
async def test_me_invalid_token(client: AsyncClient):
    me_resp = await client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer invalidtoken123"}
    )
    assert me_resp.status_code == 401
