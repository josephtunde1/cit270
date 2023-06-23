FROM node:alpine

WORKDIR /usr/app

COPY package.json /usr/app

COPY server.js /usr/app

# it installs the current packages
RUN npm install

EXPOSE 3000

# the below command is what happens
CMD ["node", "server.js"]