# Use an official Node.js image as the base image
FROM node:16

RUN mkdir -p /user-service
# Set the working directory in the container
WORKDIR /user-service

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "bin/www"]
