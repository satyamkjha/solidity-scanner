FROM node:16-alpine3.16 AS builder
WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

# FROM nginx

# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*

# COPY --from=builder /app/build .
# COPY --from=builder /app/.env /.env

# EXPOSE 80

# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]