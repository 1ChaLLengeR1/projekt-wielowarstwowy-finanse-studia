import pytest
from unittest.mock import patch
from core.helper.validators import is_valid_uuid, get_env_variable, validate_required_fields


class TestIsValidUuid:

    def test_valid_uuid_v4(self):
        assert is_valid_uuid("550e8400-e29b-41d4-a716-446655440000") is True

    def test_invalid_string(self):
        assert is_valid_uuid("not-a-uuid") is False

    def test_empty_string(self):
        assert is_valid_uuid("") is False

    def test_uuid_uppercase(self):
        assert is_valid_uuid("550E8400-E29B-41D4-A716-446655440000") is False

    def test_uuid_missing_dashes(self):
        assert is_valid_uuid("550e8400e29b41d4a716446655440000") is False

    def test_uuid_wrong_version(self):
        uuid_v1 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
        assert is_valid_uuid(uuid_v1, version=4) is False

    def test_valid_uuid_v1_with_version_param(self):
        uuid_v1 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
        assert is_valid_uuid(uuid_v1, version=1) is True

    def test_random_number(self):
        assert is_valid_uuid("12345") is False


class TestGetEnvVariable:

    def test_existing_variable(self):
        with patch.dict("os.environ", {"TEST_VAR": "hello"}):
            assert get_env_variable("TEST_VAR") == "hello"

    def test_missing_variable_raises(self):
        with patch.dict("os.environ", {}, clear=True):
            with pytest.raises(Exception, match="Missing required environment variable: MISSING_VAR"):
                get_env_variable("MISSING_VAR")

    def test_strips_double_quotes(self):
        with patch.dict("os.environ", {"TEST_VAR": '"quoted_value"'}):
            assert get_env_variable("TEST_VAR") == "quoted_value"

    def test_strips_single_quotes(self):
        with patch.dict("os.environ", {"TEST_VAR": "'single_quoted'"}):
            assert get_env_variable("TEST_VAR") == "single_quoted"

    def test_plain_value_unchanged(self):
        with patch.dict("os.environ", {"TEST_VAR": "plain_value"}):
            assert get_env_variable("TEST_VAR") == "plain_value"

    def test_empty_string_raises(self):
        with patch.dict("os.environ", {"TEST_VAR": ""}):
            with pytest.raises(Exception, match="Missing required environment variable: TEST_VAR"):
                get_env_variable("TEST_VAR")


class TestValidateRequiredFields:

    def test_all_fields_present(self):
        data = {"name": "Jan", "age": 30, "email": "jan@test.pl"}
        valid, msg = validate_required_fields(data, ["name", "age", "email"])
        assert valid is True
        assert msg == ""

    def test_missing_single_field(self):
        data = {"name": "Jan"}
        valid, msg = validate_required_fields(data, ["name", "email"])
        assert valid is False
        assert "email" in msg

    def test_missing_multiple_fields(self):
        data = {}
        valid, msg = validate_required_fields(data, ["name", "age", "email"])
        assert valid is False
        assert "name" in msg
        assert "age" in msg
        assert "email" in msg

    def test_empty_required_fields(self):
        valid, msg = validate_required_fields({"name": "Jan"}, [])
        assert valid is True

    def test_empty_data_dict(self):
        valid, msg = validate_required_fields({}, ["name", "age"])
        assert valid is False
        assert "name" in msg
        assert "age" in msg

    def test_extra_fields_in_data_ignored(self):
        data = {"name": "Jan", "extra": "value"}
        valid, msg = validate_required_fields(data, ["name"])
        assert valid is True

    def test_missing_message_format(self):
        data = {"name": "Jan"}
        valid, msg = validate_required_fields(data, ["name", "age"])
        assert "Missing field(s):" in msg
