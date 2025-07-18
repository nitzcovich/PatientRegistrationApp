from sqlalchemy import Column, Integer, String, LargeBinary
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Patient(Base):
    __tablename__= "patients"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    lastname = Column(String(255), nullable=False)
    email = Column(String(255),unique=True, nullable=False)
    phone = Column(String(50), nullable=False)
    document_photo = Column(LargeBinary, nullable=False)
