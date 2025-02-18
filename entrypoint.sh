#!/bin/sh

# Run database migrations
echo "Running migrations..."
npm run db:migrate

# Start the application
echo "Starting the app..."
npm run dev
