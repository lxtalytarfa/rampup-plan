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

