FROM node:alpine
WORKDIR /app/serverGQL
COPY package*.json /app/serverGQL/
# RUN yarn 
# for production # RUN yarn && yarn cache clean
COPY . /app/serverGQL/