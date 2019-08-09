FROM node:alpine as builder

WORKDIR /app
RUN npm install

COPY package.json /app/
RUN cd /app && npm set progress=false && npm install

COPY . /app
RUN cd /app
CMD ["npm", "start"]

#RUN npm start

#FROM nginx:alpine
#
#RUN rm -rf /usr/share/nginx/html/*
#RUN rm -rf /etc/nginx/html/*
#
#COPY --from=builder /app/build /usr/share/nginx/html
#COPY --from=builder /app/build /etc/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
##COPY default.conf /etc/nginx/conf.d/default.conf
##COPY .htpasswd /etc/nginx/.htpasswd
EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]