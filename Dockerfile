# required command to specify node version
FROM node:14 

#set working directory to /app [recommended]
WORKDIR /app

#copy package.json to the same directory [/app]
#to choose the same directory, type '.' at the end of the lnie
COPY package.json .

ARG NODE_ENV
# Since production doesn't use npm devDependencies,
# the following if condition check whether the docker command contains dev/prod docker-compose file
# if: dev: retrieve devDependencies such as nodemon
# else: prod: retreieve only production-needed packages 
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

#copy everything on this directory to the docker image [/app]
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]