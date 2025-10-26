# Dockerfile
FROM node:18-alpine

# create app directory
WORKDIR /app

# copy package files and install deps
COPY package*.json ./
RUN npm ci --only=production

# copy app
COPY . .

# expose port
EXPOSE 3000

# start app
CMD ["node", "server.js"]
