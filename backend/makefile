install_dependencies:
	pip install -r requirements.txt

run_app:
	uvicorn main:app --reload --log-level debug --port 3000

compose_build:
	docker compose -f local.docker-compose.yaml build

compose_up:
	docker compose -f local.docker-compose.yaml up -d --build

compose_down:
	docker compose -f local.docker-compose.yaml down

run_test:
	pytest -s -v -m ""