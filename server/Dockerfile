# server:
FROM node:22-alpine
WORKDIR /app

# The build ARGs are no longer needed, so we clean up the Dockerfile (Optional but recommended)
# ARG MONGO_URI_BUILD
# ENV MONGO_URI=$MONGO_URI_BUILD
# ENV JWT_SECRET=$JWT_SECRET_BUILD
# RUN npm prune --production # This is also unnecessary if running npm install --omit=dev later

# Install dependencies needed for RUNTIME (since scripts now run at runtime)
COPY package*.json ./
# Install only production dependencies for the final image size
RUN npm install 
# NOTE: If your seeding scripts still rely on ts-node, you must run `npm install` (without --omit=dev) here.
# Assuming you successfully made your seed scripts run against compiled JS, --omit=dev is correct here.

COPY . .

# Compile TypeScript files to JavaScript (CRITICAL: must be done during build)
RUN npm run build

# 1. Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Cleanup the build-time ENV
# ENV MONGO_URI= # No longer needed if not set above

# Use non-root user for security
# USER nodejs 
EXPOSE 3000

# 2. Set the entrypoint to run the script
ENTRYPOINT ["docker-entrypoint.sh"]

# 3. Set the command that the entrypoint script will execute last (the "$@" in the script)
CMD ["npm", "start"]