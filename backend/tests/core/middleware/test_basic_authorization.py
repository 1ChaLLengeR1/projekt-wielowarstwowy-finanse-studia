import pytest
import jwt
from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock
from core.middleware.basic_authorization import JWTBasicAuthenticationMiddleware

SECRET = "test-secret-key"
REFRESH_SECRET = "test-refresh-secret"
ALGORITHM = "HS256"


def _env(name: str) -> str:
    mapping = {
        "SECRET_KEY_TOKEN": SECRET,
        "SECRET_KEY_REFRESH_TOKEN": REFRESH_SECRET,
        "ALGORITHM": ALGORITHM,
        "TOKEN_EXPIRES_HOURS": "1",
        "REFRESH_TOKEN_EXPIRES_HOURS": "168",
    }
    return mapping[name]


def make_token(payload: dict, secret: str = SECRET) -> str:
    return jwt.encode(payload, secret, algorithm=ALGORITHM)


@pytest.fixture
def middleware():
    return JWTBasicAuthenticationMiddleware()


class TestDecodeJwt:

    def test_valid_token_returns_true(self, middleware):
        payload = {"id": "user-123", "exp": datetime.utcnow() + timedelta(hours=1)}
        token = make_token(payload)
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            valid, msg = middleware.decode_jwt(token)
        assert valid is True
        assert msg == ""

    def test_expired_token_returns_false(self, middleware):
        payload = {"id": "user-123", "exp": datetime.utcnow() - timedelta(hours=1)}
        token = make_token(payload)
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            valid, msg = middleware.decode_jwt(token)
        assert valid is False
        assert "expired" in msg.lower()

    def test_invalid_token_returns_false(self, middleware):
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            valid, msg = middleware.decode_jwt("not.a.valid.token")
        assert valid is False
        assert "decode error" in msg.lower()

    def test_token_without_id_returns_false(self, middleware):
        payload = {"exp": datetime.utcnow() + timedelta(hours=1)}
        token = make_token(payload)
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            valid, msg = middleware.decode_jwt(token)
        assert valid is False
        assert "No such user" in msg

    def test_token_signed_with_wrong_secret_returns_false(self, middleware):
        payload = {"id": "user-123", "exp": datetime.utcnow() + timedelta(hours=1)}
        token = make_token(payload, secret="wrong-secret")
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            valid, msg = middleware.decode_jwt(token)
        assert valid is False


class TestEncodeRefreshJwt:

    def test_returns_string_token(self, middleware):
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            token = middleware.encode_refresh_jwt("user-abc")
        assert isinstance(token, str)
        assert len(token) > 0

    def test_token_contains_user_id(self, middleware):
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            token = middleware.encode_refresh_jwt("user-abc")
        payload = jwt.decode(token, REFRESH_SECRET, algorithms=[ALGORITHM])
        assert payload["id"] == "user-abc"

    def test_token_has_expiry(self, middleware):
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            token = middleware.encode_refresh_jwt("user-abc")
        payload = jwt.decode(token, REFRESH_SECRET, algorithms=[ALGORITHM])
        assert "exp" in payload


class TestEncodeJwt:

    def test_user_not_found_returns_false(self, middleware):
        mock_db = MagicMock()
        mock_db.query.return_value.filter.return_value.first.return_value = None
        with patch("core.middleware.basic_authorization.get_db", return_value=iter([mock_db])):
            with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
                valid, msg, data = middleware.encode_jwt("nonexistent", "password")
        assert valid is False
        assert "not exist" in msg
        assert data is None

    def test_wrong_password_returns_false(self, middleware):
        from passlib.context import CryptContext
        ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
        mock_user = MagicMock()
        mock_user.password = ctx.hash("correct_password")
        mock_db = MagicMock()
        mock_db.query.return_value.filter.return_value.first.return_value = mock_user
        with patch("core.middleware.basic_authorization.get_db", return_value=iter([mock_db])):
            with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
                valid, msg, data = middleware.encode_jwt("user", "wrong_password")
        assert valid is False
        assert "not correct" in msg
        assert data is None

    def test_correct_credentials_returns_token(self, middleware):
        from passlib.context import CryptContext
        ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
        mock_user = MagicMock()
        mock_user.id = "user-uuid-123"
        mock_user.username = "artek"
        mock_user.password = ctx.hash("secret")
        mock_db = MagicMock()
        mock_db.query.return_value.filter.return_value.first.return_value = mock_user
        with patch("core.middleware.basic_authorization.get_db", return_value=iter([mock_db])):
            with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
                valid, msg, data = middleware.encode_jwt("artek", "secret")
        assert valid is True
        assert msg == ""
        assert data["username"] == "artek"
        assert "access_token" in data
        assert "refresh_token" in data


class TestDecodeRefreshJwt:

    def test_empty_token_returns_false(self, middleware):
        with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
            valid, msg, data = middleware.decode_refresh_jwt("", "user-123")
        assert valid is False
        assert "not provided" in msg

    def test_invalid_refresh_token_returns_false(self, middleware):
        mock_db = MagicMock()
        with patch("core.middleware.basic_authorization.get_db", return_value=iter([mock_db])):
            with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
                valid, msg, data = middleware.decode_refresh_jwt("bad.token.here", "user-123")
        assert valid is False
        assert data is None

    def test_user_not_found_returns_false(self, middleware):
        payload = {"id": "user-123", "exp": datetime.utcnow() + timedelta(hours=168)}
        token = jwt.encode(payload, REFRESH_SECRET, algorithm=ALGORITHM)
        mock_db = MagicMock()
        mock_db.query.return_value.filter.return_value.first.return_value = None
        with patch("core.middleware.basic_authorization.get_db", return_value=iter([mock_db])):
            with patch("core.middleware.basic_authorization.get_env_variable", side_effect=_env):
                valid, msg, data = middleware.decode_refresh_jwt(token, "user-123")
        assert valid is False
        assert "not exist" in msg
