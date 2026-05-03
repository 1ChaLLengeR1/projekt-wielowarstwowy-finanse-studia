import pytest
from passlib.context import CryptContext
from core.middleware.utils import verification_password

_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


class TestVerificationPassword:

    def test_correct_password_returns_true(self):
        hashed = _ctx.hash("secret123")
        assert verification_password("secret123", hashed) is True

    def test_wrong_password_returns_false(self):
        hashed = _ctx.hash("secret123")
        assert verification_password("wrong_password", hashed) is False

    def test_empty_password_returns_false(self):
        hashed = _ctx.hash("secret123")
        assert verification_password("", hashed) is False

    def test_different_hashes_same_password(self):
        password = "my_password"
        hash1 = _ctx.hash(password)
        hash2 = _ctx.hash(password)
        assert hash1 != hash2
        assert verification_password(password, hash1) is True
        assert verification_password(password, hash2) is True

    def test_password_with_special_characters(self):
        password = "zaq1@WSX!#$"
        hashed = _ctx.hash(password)
        assert verification_password(password, hashed) is True

    def test_similar_password_returns_false(self):
        hashed = _ctx.hash("password123")
        assert verification_password("Password123", hashed) is False
