FROM node:19.9-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:19.9-alpine as deploy-node

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "index.js"]
