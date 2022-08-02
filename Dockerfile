# build static client files
FROM node:lts-alpine as builder

WORKDIR /client
COPY /client/package*.json .
RUN npm ci --only=production

COPY ["/client/src", "/client/public", "./"]
RUN npm run build

# build and run server
FROM node:lts-alpine

COPY --from=builder /client/build /client/

WORKDIR /server
COPY /server/package*.json .
RUN npm ci --only=production

COPY ["/server/src", "/server/data", "./"]
RUN npm run start:prod:unix
