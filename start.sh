#!/bin/bash

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: Docker is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: Docker Compose is not installed.' >&2
  exit 1
fi

cd "$(dirname "$0")"

echo "Building and running Docker containers..."
docker-compose up --build -d

if [ $? -eq 0 ]; then
  echo "Application started successfully."
else
  echo "Failed to start the application."
  exit 1
fi
