FROM node:21-alpine

RUN yarn global add nodemon

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD [ "yarn", "dev" ]