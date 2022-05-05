FROM node

ENV NODE_ENV="docker"

WORKDIR /app

# . significa directorio actual
COPY package*.json .

RUN npm install

COPY /src .

EXPOSE 4000

CMD [ "node","index.js" ]

# Investigar acerca de los Dockerfile
# Crear container de Nginx

# Crear imagen con app de NODEJS