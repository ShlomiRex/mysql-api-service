FROM node:alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY . .

WORKDIR /usr/src/app/server
RUN npm install --development --silent
EXPOSE 8081
CMD [ "npm", "run", "nodemon" ]