FROM node:8.16.2-alpine

# Set a working directory
COPY . /tmp/app
RUN ls /tmp/app 

WORKDIR /tmp/app

# Install Node.js dependencies
RUN yarn install

RUN yarn run build --release


# Set permissions for "node" user
RUN chown -R node:node /tmp/app
RUN chmod 755 /tmp/app

# Run the container under "node" user by default
USER node

# Set NODE_ENV env variable to "production" for faster expressjs
ENV NODE_ENV production

WORKDIR /tmp/app/build/

CMD [ "node", "server.js" ]
