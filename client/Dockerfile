FROM node:18-alpine

WORKDIR /app
COPY . /app
COPY package.json package-lock.json ./

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]