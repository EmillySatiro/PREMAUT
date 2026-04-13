from typing import Any

from psycopg.rows import dict_row

from app.core.database import open_connection


class UserRepository:
    def list_users(self, limit: int) -> list[dict[str, Any]]:
        with open_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cursor:
                cursor.execute(
                    """
                    SELECT id, nome, email, tipo, ativo
                    FROM premaut.usuarios
                    ORDER BY id
                    LIMIT %s
                    """,
                    (limit,),
                )
                rows = cursor.fetchall()

        return [dict(row) for row in rows]


def get_user_repository() -> UserRepository:
    return UserRepository()