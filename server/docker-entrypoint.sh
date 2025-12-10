#!/bin/sh

# This script runs commands after the container has started but before the main application.

# 1. Wait for MongoDB to be healthy (Optional, but safer than just relying on depends_on)
# Since we are using service_healthy in docker-compose.yml, this check is often overkill, 
# but it provides an extra layer of robustness.
echo "Waiting for MongoDB to be available..."
# We try to connect to the 'mongodb' service on the mili-resort network
/usr/bin/timeout 30 sh -c 'while ! ping -c 1 mongodb > /dev/null; do sleep 1; done'
if [ $? -ne 0 ]; then
  echo "MongoDB service did not respond. Exiting."
  exit 1
fi
echo "MongoDB is up. Running seeding scripts..."

# 2. Run the seeding scripts now that the environment is fully loaded
# Ensure your package.json scripts point to the correct compiled files (e.g., dist/...)
npm run create:admin
npm run create:rooms

# 3. Start the main application
echo "Starting application..."
exec "$@"