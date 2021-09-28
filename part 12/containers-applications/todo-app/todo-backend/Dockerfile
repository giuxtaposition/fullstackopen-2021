FROM node:16

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm ci --only=production

CMD npm start