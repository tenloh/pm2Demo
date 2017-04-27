FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/
RUN npm install

# Install PM2
RUN npm install -g pm2

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "pm2-docker", "process.yml" ]
