from fastapi import FastAPI
from api.api import api_router

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Project Finance",
    description="The project I use every day for my everyday work"
)

app.include_router(api_router)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept", "x-refresh-token", "UserData"],
    expose_headers=["Content-Disposition"],
)
