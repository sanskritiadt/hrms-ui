FROM node:alpine as builder

ENV http_proxy http://gateway:30002

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]