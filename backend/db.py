from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# db_url = "postgresql://myuser:mypassword@localhost:5432/mydatabase"

load_dotenv()
db_url = os.getenv("POSTGRES_DB_URL")
engine = create_engine(db_url)
SessionLocal = sessionmaker(bind=engine)

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        version = result.scalar()
        print(f'Connected to PostgreSQL, version: {version}')
except Exception as e:
    print("Failed to connect")