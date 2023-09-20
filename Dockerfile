# Use the official Node.js LTS (Long Term Support) image
FROM node:lts as base

# Set a working directory
WORKDIR /app

# Copy just the package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# ---- Build Stage ----
FROM base as build

# Install all dependencies including development dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# ---- Final Stage ----
FROM base as final

# Copy only the built artifacts from the build stage
COPY --from=build /app/dist ./dist


# Set Evnironment Variables
ENV NODE_ENV=production
ENV PORT=3000
ENV CLUSTER=true

# Specify the command to run the application
CMD ["npm", "start"]
