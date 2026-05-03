import pytest
from core.helper.headers import check_required_headers


class MockRequest:
    def __init__(self, headers: dict):
        self.headers = headers


class TestCheckRequiredHeaders:

    def test_missing_single_header(self):
        request = MockRequest(headers={})
        result = check_required_headers(request, ["Authorization"])

        assert result["is_valid"] is False
        assert result["status"] == "ERROR"
        assert result["status_code"] == 403
        assert "Authorization" in result["data"]["message"]

    def test_missing_multiple_headers(self):
        request = MockRequest(headers={})
        result = check_required_headers(request, ["Authorization", "UserData"])

        assert result["status"] == "ERROR"
        assert result["status_code"] == 403
        assert "Authorization" in result["data"]["message"]
        assert "UserData" in result["data"]["message"]

    def test_empty_required_headers(self):
        request = MockRequest(headers={})
        result = check_required_headers(request, [])

        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert result["data"] == []

    def test_userdata_valid_json(self):
        request = MockRequest(headers={"UserData": '{"id": "123", "role": "admin"}'})
        result = check_required_headers(request, ["UserData"])

        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert len(result["data"]) == 1
        assert result["data"][0]["header"] == "UserData"
        assert result["data"][0]["data"] == {"id": "123", "role": "admin"}

    def test_userdata_invalid_json(self):
        request = MockRequest(headers={"UserData": "not-valid-json"})
        result = check_required_headers(request, ["UserData"])

        assert result["status"] == "ERROR"
        assert result["status_code"] == 403
        assert "Invalid JSON format" in result["data"]["message"]

    def test_x_refresh_token_present(self):
        request = MockRequest(headers={"X-Refresh-Token": "some-token-value"})
        result = check_required_headers(request, ["X-Refresh-Token"])

        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert len(result["data"]) == 1
        assert result["data"][0]["header"] == "X-Refresh-Token"
        assert result["data"][0]["data"] == "some-token-value"

    def test_userdata_and_x_refresh_token(self):
        request = MockRequest(headers={
            "UserData": '{"id": "abc"}',
            "X-Refresh-Token": "refresh-xyz"
        })
        result = check_required_headers(request, ["UserData", "X-Refresh-Token"])

        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert len(result["data"]) == 2
        headers_map = {item["header"]: item["data"] for item in result["data"]}
        assert headers_map["UserData"] == {"id": "abc"}
        assert headers_map["X-Refresh-Token"] == "refresh-xyz"

    def test_authorization_header_not_added_to_data(self):
        request = MockRequest(headers={"Authorization": "Bearer token123"})
        result = check_required_headers(request, ["Authorization"])

        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert result["data"] == []

    def test_missing_one_of_many_headers(self):
        request = MockRequest(headers={"Authorization": "Bearer token123"})
        result = check_required_headers(request, ["Authorization", "UserData"])

        assert result["status"] == "ERROR"
        assert result["status_code"] == 403
        assert "UserData" in result["data"]["message"]
        assert "Authorization" not in result["data"]["message"]

    def test_userdata_empty_json_object(self):
        request = MockRequest(headers={"UserData": "{}"})
        result = check_required_headers(request, ["UserData"])

        assert result["status"] == "SUCCESS"
        assert result["data"][0]["data"] == {}
