FROM node:8.9

RUN mkdir /app
RUN mkdir /app/src

COPY nodemon.json /app/nodemon.json
COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY postcss.config.js /app/postcss.config.js
COPY tsconfig.json /app/tsconfig.json
COPY src/ /app/src
COPY build/ /app/build
COPY typings/ /app/typings

WORKDIR /app

RUN npm install --silent;  npm run dev-build
CMD ["npm", "run", "start"]
