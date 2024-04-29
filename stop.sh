#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: Docker Compose is not installed.' >&2
  exit 1
fi

cd "$(dirname "$0")"

echo "Stopping and removing Docker containers..."
docker-compose down

if [ $? -eq 0 ]; then
  echo "Containers stopped and cleaned up successfully."
else
  echo "Failed to stop and clean up containers."
  exit 1
fi
