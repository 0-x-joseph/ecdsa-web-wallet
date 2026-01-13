FROM node:24

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["node", "index.js"]

