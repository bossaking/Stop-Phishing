# Use official node image as the base image
FROM node:16.14.2-alpine3.14 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run ng build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/Phishing-Stop .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
