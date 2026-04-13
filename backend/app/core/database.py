import os
from contextlib import contextmanager
from typing import Iterator

from fastapi import HTTPException
import psycopg


def get_database_url() -> str | None:
    return os.getenv("DATABASE_URL")


def get_database_status() -> str:
    database_url = get_database_url()

    if not database_url:
        return "not-configured"

    try:
        with psycopg.connect(database_url, connect_timeout=3) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        return "up"
    except Exception:
        return "down"


@contextmanager
def open_connection() -> Iterator[psycopg.Connection]:
    database_url = get_database_url()

    if not database_url:
        raise HTTPException(status_code=503, detail="DATABASE_URL nao configurada.")

    try:
        with psycopg.connect(database_url, connect_timeout=5) as conn:
            yield conn
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Banco de dados indisponivel.") from exc