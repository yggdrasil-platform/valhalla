#!/usr/bin/env bash

source ./scripts/set_vars.sh

###
# Creates a temporary PostgreSQL container and runs tests.
###

function read_env_file {
  set -a
  [ -f .env.test ] && source .env.test
  set +a
}

##
# Main function
##
function main {
  local container_id

  set_vars

  # Read test env file
  read_env_file

  # Runs postgres Docker image in the background.
  container_id=$(docker run \
   --name valkyrie_db_test \
   -e POSTGRES_DB="${DB_NAME}" \
   -e POSTGRES_PASSWORD="${DB_PASSWORD}" \
   -e POSTGRES_USER="${DB_USER}" \
   -d \
   -p "${DB_PORT}":5432 \
   postgres:12-alpine)
  printf "%b Running PostgreSQL container: %b\n" "${INFO_PREFIX}" "${container_id}"

  # Wait for container to start.
  sleep 2

  # Run tests.
  "${BIN_PATH}"/jest --runInBand

  # Force remove database container.
  printf "%b Removing PostgreSQL container: %b\n" "${INFO_PREFIX}" "${container_id}"
  docker rm -f "${container_id}"
}

# And so, it begins...
main
