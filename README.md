# T-WEB-800-NAN_5

Original repository: https://github.com/MelvinCou/idee

## Server

```sh
# Get into server folder
cd server
# Run swagger
swag init
# Format swagger comments
swag fmt
# Run server with hot reload
air
# access to API documentation: http://127.0.0.1:8080/swagger/index.html
```

## Front

```sh
# Refresh API access
npx swagger-typescript-api --modular -p ./server/docs/swagger.json -o ./front/src/api
# Get into front folder
cd front
# Install dependencies
npm install
# Run front with hot reload
npm run dev
```
