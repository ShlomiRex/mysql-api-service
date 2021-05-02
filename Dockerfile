FROM node:alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/server
RUN npm install --production --silent
EXPOSE 8081
CMD [ "npm", "start" ]