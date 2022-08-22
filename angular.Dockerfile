FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install -g @angular/cli
COPY ./ /app/
RUN npm run build -- --output-path=./dist/out --configuration $configuration

#STAGE 2
FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/out/ /usr/share/nginx/html