#!/bin/bash
docker-compose -f server.yml up -d
docker-compose -f client.yml up -d