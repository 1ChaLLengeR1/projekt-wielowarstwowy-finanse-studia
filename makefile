compose_build:
	docker compose -f docker-compose.yaml build

compose_up:
	docker compose -f docker-compose.yaml up -d --build

compose_down:
	docker compose -f docker-compose.yaml down