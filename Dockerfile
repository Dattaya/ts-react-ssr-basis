FROM node:8-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY ./server-prod-dist ./server-prod-dist
COPY ./static ./static

CMD [ "node", "./server-prod-dist" ]
