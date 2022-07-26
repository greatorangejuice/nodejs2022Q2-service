FROM node:16-alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci &&  npm cache clean --force

COPY . .

RUN npm prune --production

CMD [  "npm", "run", "start:dev" ]
