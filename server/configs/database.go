package configs

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetCollection returns a MongoDB collection with the specified name.
func GetCollection(collectionName string) (*mongo.Collection, error) {
	// Connect to the MongoDB database
	client, err := ConnectToDB()
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %v", err)
	}

	if client == nil {
		return nil, fmt.Errorf("client is nil")
	}

	// Return the MongoDB collection
	return client.Database("t-web-800").Collection(collectionName), nil
}

// ConnectToDB connects to the MongoDB database and returns a client.
func ConnectToDB() (*mongo.Client, error) {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file. Using environment variables")
	}

	// Get the MongoDB URI from the environment variables
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("Please set MONGODB_URI")
	}

	// Create a background context
	ctx := context.Background()

	// Set the server API options
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	// Connect to the MongoDB server
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to MongoDB server: %v", err)
	}

	// Return the MongoDB client
	return client, nil
}
