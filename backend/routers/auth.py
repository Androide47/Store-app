from datetime import timedelta, timezone, datetime
from typing_extensions import Annotated
from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel
from models.users import User
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from settings.database import SessionLocal
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

SECRET_KEY = "YourSecretKey"
ALGORITHM = "YourAlgorithm" #Example HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')

def autenticate_user(username:str, password:str, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, user_id: int, expires_delta=timedelta):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return {"username": username, "user_id": user_id}

class CreateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    password: str
    role: str 

class UpdateUserRequest(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    role: str

class ChangePasswordRequest(BaseModel):
    password: str
    new_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, 
                      create_user_request: CreateUserRequest):
    create_user_model = User(
        email=create_user_request.email,
        username=create_user_request.username,
        first_name=create_user_request.first_name,
        last_name=create_user_request.last_name,
        hashed_password=bcrypt_context.hash(create_user_request.password),
        is_active=True,
        role=create_user_request.role
    )

    db.add(create_user_model)
    db.commit()

    if create_user_model is not None:
        return create_user_model
    raise HTTPException(status_code=400, detail="User creation failed.")

@router.put("/update", status_code=status.HTTP_200_OK)
async def update_user(user: Annotated[dict, Depends(get_current_user)],
                      db: db_dependency,
                      update_user_request: UpdateUserRequest):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication required")
        
    user_model = db.query(User).filter(User.id == user["user_id"]).first()
    if user_model is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_model.username = update_user_request.username
    user_model.email = update_user_request.email
    user_model.first_name = update_user_request.first_name
    user_model.last_name = update_user_request.last_name
    user_model.role = update_user_request.role
    db.commit()
    return user_model

@router.put("/change_password", status_code=status.HTTP_200_OK)
async def change_password(user: Annotated[dict, Depends(get_current_user)],
                          db: db_dependency,
                          change_password_request: ChangePasswordRequest):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication required")
        
    user_model = db.query(User).filter(User.id == user["user_id"]).first()
    if user_model is None:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Verify current password
    if not bcrypt_context.verify(change_password_request.password, user_model.hashed_password):
        raise HTTPException(status_code=401, detail="Current password is incorrect")
        
    # Update password
    user_model.hashed_password = bcrypt_context.hash(change_password_request.new_password)
    db.commit()
    return {"message": "Password updated successfully"}

@router.post("/token", response_model=Token, status_code=status.HTTP_200_OK)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    authentication = autenticate_user(form_data.username, form_data.password, db)
    if not authentication:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    token = create_access_token(
        username=authentication.username,
        user_id=authentication.id,
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": token, "token_type": "bearer"}