FROM node:14-alpine

# Create app directory

WORKDIR /usr/node-app

ENV NODE_SERVER_PORT=8081

COPY . .

# install server deps

WORKDIR server

RUN npm install --legacy-peer-deps

# install client deps

WORKDIR ..

RUN npm install

EXPOSE 8081

ENTRYPOINT ["npm", "run", "start:app" ]
