############################
# Image: Builds the app.
############################
FROM node:14.15.1 AS builder

# Use bash shell
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install all dependencies.
COPY package.json /tmp/
COPY yarn.lock /tmp/
RUN cd /tmp && \
    yarn install
RUN mkdir -p /build && \
    cp -a /tmp/node_modules /build/

# Set working directory and copy the source files.
WORKDIR /build
COPY . .

# Build the app.
RUN ./scripts/build.sh

############################
# Image: Runs the app.
############################
FROM node:14.15.1-alpine

ARG db_host
ARG db_name
ARG db_password
ARG db_port
ARG db_user
ARG encryption_key
ARG log_level
ARG node_env
ARG port
ARG service_name

ENV DB_HOST=$db_host
ENV DB_NAME=$db_name
ENV DB_PASSWORD=$db_password
ENV DB_PORT=$db_port
ENV DB_USER=$db_user
ENV ENCRYPTION_KEY=$encryption_key
ENV LOG_LEVEL=$log_level
ENV NODE_ENV=$node_env
ENV PORT=$port
ENV SERVICE_NAME=$service_name

# Get distro depencdencies
RUN apk add --no-cache --upgrade bash

WORKDIR /usr/app

# Install production only dependenices
COPY --from=builder /build/package.json /usr/app/
COPY --from=builder /build/yarn.lock /usr/app/
RUN yarn install --production

# Copy build files and startup scripts.
COPY --from=builder /build/scripts/set_vars.sh /usr/app/scripts/
COPY --from=builder /build/scripts/start.sh /usr/app/scripts/
COPY --from=builder /build/dist /usr/app/dist

# Open up the port
EXPOSE $PORT

# Fly my pretties!!
CMD ["sh", "-c", "./scripts/start.sh"]
