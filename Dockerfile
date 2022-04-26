FROM node:16-alpine as dev-deps
WORKDIR /app
COPY . /app/
RUN yarn install --frozen-lockfile --ignore-scripts

FROM dev-deps as builder-backend
RUN yarn server:build

FROM node:16-alpine as app-server
WORKDIR /app
COPY --from=dev-deps /app/node_modules/ /app/node_modules/
COPY --from=builder-backend /app/dist/ /app/dist/

FROM dev-deps as builder-front
RUN yarn client:build

FROM nginx:latest as app-front
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder-front /app/dist/client /usr/share/nginx/html/
