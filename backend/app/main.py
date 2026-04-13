from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.modules.health.router import router as health_router
from app.modules.users.router import router as users_router


app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": f"{settings.app_name} API online"}


app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(users_router, prefix="/users", tags=["users"])