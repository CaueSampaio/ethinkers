FROM node:11.9.0 as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/app
RUN npm run build

FROM nginx:1.15-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
