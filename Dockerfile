# Use a Node.js base image with the specified version (you can change the version as needed)
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY app .

# Expose the port that the server will listen on
EXPOSE 8080

# Start the server
CMD ["npm", "start"]