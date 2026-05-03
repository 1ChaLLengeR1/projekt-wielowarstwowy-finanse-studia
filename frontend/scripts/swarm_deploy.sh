#!/bin/bash

set -e

LOG_FILE="swarm_deploy_frontend.log"
DOCKER_USER="arturscibor"
DOCKER_REPO="praca.strona.arturscibor.pl"
FULL_IMAGE_NAME="$DOCKER_USER/$DOCKER_REPO:latest"

echo ">>> Pobieranie obrazu z Docker Huba: $FULL_IMAGE_NAME ..."
docker pull $FULL_IMAGE_NAME

echo ">>> Deploy stacka do Swarma..."
docker stack deploy -c ../prod.swarm.docker-compose.yaml spinetime_frontend

echo ">>> Usuwanie nieużywanych obrazów..."
docker image prune -f

DEPLOY_DATE=$(date '+%Y-%m-%d %H:%M:%S')
DEPLOY_MESSAGE="✅ Frontend Swarm deploy zakończony. Wersja: latest, Data: $DEPLOY_DATE"

echo ">>> $DEPLOY_MESSAGE"
echo "$DEPLOY_MESSAGE" >> "$LOG_FILE"
