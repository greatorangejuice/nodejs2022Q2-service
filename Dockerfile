FROM node:16-alpine AS development
WORKDIR /usr/src/app
COPY . .

RUN npm install &&  npm cache clean --force
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

CMD [  "npm", "run", "prisma:migrate:dev" ]


# remove unused dependencies
#RUN rm -rf node_modules/rxjs/src/
#RUN rm -rf node_modules/rxjs/bundles/
#RUN rm -rf node_modules/rxjs/_esm5/
#RUN rm -rf node_modules/rxjs/_esm2015/
#RUN rm -rf node_modules/swagger-ui-dist/*.map
#RUN rm -rf node_modules/couchbase/src/

#FROM node:16-alpine as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY --from=development /usr/src/app/node_modules ./node_modules
#COPY --from=development /usr/src/app/dist ./dist
#COPY --from=development /usr/src/app/prisma ./prisma
#COPY --from=development /usr/src/app/doc ./doc
#COPY --from=development /usr/src/app/package*.json ./
#
