FROM node:8.11.1-alpine

RUN mkdir app

WORKDIR /app

COPY . /app

RUN npm install --production

EXPOSE 3001

CMD ["npm", "start"]
