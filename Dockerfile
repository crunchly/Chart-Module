FROM node:8.11.1-alpine

RUN mkdir app

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
