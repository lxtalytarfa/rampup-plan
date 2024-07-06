Using Ubuntu Linux with WSL

## Week 1

Basic implementation of FastAPI with PostgreSQL.

#### Setup:

Required pip packages:

```
pip install fastapi psycopg2-binary sqlalchemy uvicorn
```

Required Ubuntu packages:
- Python
- Pip

```
sudo apt install postgresql build-dep python-psycopg2 uvicorn
```

*To setup PostgreSQL:*

```
sudo -u postgres -i
psql
\password
```
Then enter password to use, I used "password" as specified also in w1/src/database.py
```
CREATE DATABASE mydb;
```
To launch:
Make sure 'src' is root directory
```
uvicorn main:app --reload
```
## Week 2

Basic Todo App built with react

#### Setup:

```
npm start
```

Open browser at `http://localhost:3000/`

## Week 3

Implementing testing with pytest from the FastAPI week 1 app.

#### Setup:

Make sure `src` is root directory

To run tests:
```
pytest
```
In these tests, when starting the test, a dummy database is created and is empty on start.

In case of needing to persist the data in the dummy database replace the code:
```py
@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Drop all tables and recreate them
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
```
With
```py
Base.metadata.create_all(bind=engine)
```
