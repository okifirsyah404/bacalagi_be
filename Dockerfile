FROM node:slim AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .

RUN apt-get update -y && apt-get install -y openssl

RUN npm install

RUN npx prisma generate

# Bundle app source

EXPOSE 3000

VOLUME ["/app/node_modules", "/app/public"]

CMD [ "npm", "start" ]