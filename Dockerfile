FROM node:14
WORKDIR /usr/src/app
COPY ./backend/package.json ./
RUN npm install
COPY ./backend/ ./
EXPOSE 8081
CMD ["node","server.js"]