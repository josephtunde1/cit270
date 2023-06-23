FROM node:alpine

COPY package.json ./

COPY server.js ./

# it installs the current packages
RUN npm install

EXPOSE 3000

# the below command is what happens
CMD ["node", "server.js"]