FROM node:8.11.1-alpine

RUN mkdir app

WORKDIR /app

COPY . /app

RUN npm install mongoose

CMD ["node", "seed.js"]

