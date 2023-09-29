FROM 132830644905.dkr.ecr.us-east-2.amazonaws.com/baseimage:node_16-alpine3.16 AS builder
WORKDIR /app
COPY . .
COPY ./package.json .
RUN apk --no-cache add curl
RUN yarn build

# FROM nginx

# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*

# COPY --from=builder /app/build .
# COPY --from=builder /app/.env /.env

# EXPOSE 80

# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]