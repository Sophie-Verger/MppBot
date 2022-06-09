FROM node:lts-alpine3.14

# Create working directory inside the container
WORKDIR /home/node/app

# Copy of the package.json into the container
COPY package*.json ./

# Installation of the dependencies
RUN npm install

# Bundle app source
COPY src/app.js .

# Expose oppened port for the Docker image
EXPOSE 8080
CMD [ "node", "src/app.js" ]
