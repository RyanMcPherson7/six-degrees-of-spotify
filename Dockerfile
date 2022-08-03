# build static client files
FROM node:lts-alpine as builder

COPY ./client/package*.json .
RUN npm ci --omit=dev

COPY ./client/public ./public
COPY ./client/src ./src
RUN npm run build

# build and run server
FROM node:lts-alpine

RUN mkdir -p client
COPY --from=builder ./build ./client/build

WORKDIR /server
COPY ./server/package*.json .
RUN npm ci --omit=dev

COPY ./server/src ./src
COPY ./server/data ./data

EXPOSE 5000
CMD ["npm", "run", "start:prod:unix"]
