#!/usr/bin/env bash

until curl -sSfo /dev/null http://localhost:3000/api/datasources/uid/prometheus/health; do echo Waiting for Grafana; sleep 1; done
curl -sSfo /dev/null http://localhost:3000/api/datasources/uid/loki/health
curl -sSfo /dev/null http://localhost:8080/actuator/health
#docker compose ps --services --status running |grep tempo
# tempo datasource health checks in grafana aren't supported as of now so just check ingester readiness
until curl -sSfo /dev/null http://localhost:3200/ready; do echo Waiting for Tempo; sleep 1; done

