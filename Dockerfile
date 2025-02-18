# Use Node.js LTS image as the base
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Copy and set the entrypoint script
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Start the application with the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
