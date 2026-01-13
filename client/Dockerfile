FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV VITE_BACKEND_URL=http://backend:9000

EXPOSE 3000

CMD ["sh", "-c", "npm run dev -- --host --port $PORT"]
