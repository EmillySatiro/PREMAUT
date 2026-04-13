from fastapi import Depends

from app.modules.users.repository import UserRepository, get_user_repository
from app.modules.users.schemas import UserSummary


class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def list_users(self, limit: int) -> list[UserSummary]:
        records = self.repository.list_users(limit=limit)
        return [UserSummary.model_validate(record) for record in records]


def get_user_service(repository: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(repository=repository)