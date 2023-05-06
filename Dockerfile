FROM node:19.9-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1-alpine-slim as deploy-nginx

COPY --from=build /app/build /usr/share/nginx/html
