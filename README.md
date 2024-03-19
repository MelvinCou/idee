# T-WEB-800-NAN_5

Original repository: https://github.com/MelvinCou/idee

## Server

Setup datatourisme database:

```sh
# Get datatourisme source file
# Uri format: https://diffuseur.datatourisme.fr/webservice/FLUX_ID/APP_KEY
mkdir -p datatourisme/dataset/kb/data/
wget https://diffuseur.datatourisme.fr/webservice/9ff559def21afe21ebb2676161bd48b0/9af7af21-4089-4435-8bd9-c1e570ed9900 --output-document datatourisme/dataset/kb/data/flux.rdf.gz
gzip -d datatourisme/dataset/kb/data/flux.rdf.gz
# Start database from docker (~30 min)
docker-compose up
```

> [!Note]
> This will take a while, please do that first

Start backend server:

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

# If there is a problem with the schema provided by datatourisme:
npm install -g get-graphql-schema
get-graphql-schema http://127.0.0.1:8081 > server/graphql/schema.graphql
```

## Front

```sh
# Get into front folder
cd front
# Install dependencies
npm install
# Update API access classes
npm run swagger
# Run front with hot reload
npm run dev
```

## Run in production mode

```sh
docker-compose -f docker-compose.yml -f docker-compose.production.yml up
```
