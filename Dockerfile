FROM node:carbon
# Create app directory
WORKDIR /psyduck
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
