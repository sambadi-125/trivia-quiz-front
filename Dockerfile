FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG BASE_HREF=/
RUN npm run build -- --configuration production --base-href ${BASE_HREF}

FROM nginx:alpine
COPY --from=build /app/dist/trivia-quiz-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
