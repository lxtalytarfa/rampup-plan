import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..database import Base
from ..main import app, get_db

DATABASE_URL = "postgresql://postgres:password@localhost/mydb"

engine = create_engine(DATABASE_URL)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Drop all tables and recreate them
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def test_create_user():
    response = client.post(
        "/users/",
        json={"email": "test@lxt.com", "password": "passwordtest"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["email"] == "test@lxt.com"
    assert "id" in data
    user_id = data["id"]

    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200, response.text
    data = response.json()
    assert data["email"] == "test@lxt.com"
    assert data["id"] == user_id


def test_get_users():
    response = client.get("/users/")
    assert response.status_code == 200, response.text
    data = response.json()
    assert len(data) >= 1
    for user in data:
        assert "id" in user
        assert "email" in user


def test_read_nonexistent_item():
    response = client.get("/users/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    user_id = data[0]["id"]

    response = client.get(f"/users/{user_id}/items/baz")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}


def test_create_item():
    response = client.get("/users/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    user_id = data[0]["id"]

    response = client.post(
        f"/users/{user_id}/items",
        json={"title": "Foo Bar", "description": "The Foo Barters"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "title": "Foo Bar",
        "description": "The Foo Barters",
        "id": 1,
        "owner_id": user_id,
    }


def test_read_items():
    response = client.get("/users/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    user_id = data[0]["id"]

    response = client.get(f"/users/{user_id}/items/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert all("title" in item for item in data)
    assert all("description" in item for item in data)
    assert all("id" in item for item in data)
    assert all("owner_id" in item for item in data)
    assert all(item["owner_id"] == user_id for item in data)
    assert response.json() == [
        {
            "title": "Foo Bar",
            "description": "The Foo Barters",
            "id": 1,
            "owner_id": user_id,
        }
    ]
