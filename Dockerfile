FROM node:20-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
#CMD src/index.js
#dist/myHomeManagerFe/server/main.js

CMD ["node", "dist/myHomeManagerFe/server/main.js"]

