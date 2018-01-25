FROM node
# Create app directory
WORKDIR /psyduck
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]

