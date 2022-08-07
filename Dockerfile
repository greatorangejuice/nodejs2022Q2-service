FROM node:16-alpine AS development
WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npx prisma generate

CMD [  "npm", "run", "prisma:migrate:dev" ]
