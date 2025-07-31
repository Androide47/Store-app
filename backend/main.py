from fastapi import FastAPI
from sqlalchemy.orm import Session
from models.models import Base
from settings.database import engine
from routers import auth, blogs, notifications, products, order, users
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

# Create uploads directory if it doesn't exist
UPLOADS_DIR = Path("uploads")
UPLOADS_DIR.mkdir(exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(blogs.router)
app.include_router(products.router)
app.include_router(order.router)
app.include_router(notifications.router)

# Mount the uploads directory for serving static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Entry point for the application

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)