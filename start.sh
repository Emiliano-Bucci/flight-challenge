#!/bin/bash
docker-compose -f server.yml -f client.yml build --no-cache & docker-compose -f server.yml -f client.yml up