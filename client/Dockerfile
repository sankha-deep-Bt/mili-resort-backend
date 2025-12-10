# client:
# 1️⃣ Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
# Use --omit=dev to skip development dependencies in the build stage
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ Production NGINX server
FROM nginx:alpine
# Copy the custom NGINX configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]