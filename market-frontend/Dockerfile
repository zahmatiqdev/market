FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN  npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production --output-path=dist --build-optimizer=false

EXPOSE 4200

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
