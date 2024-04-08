package services

import (
	"context"
	"log"

	"server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateUser inserts a new user into the database collection.
func CreateUser(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
	insertResult, err := collection.InsertOne(context.TODO(), user)

	if err != nil {
		log.Fatalf("Error during user insertion: %v", err)
		return nil, err
	}

	return insertResult, nil
}

// FindUser searches for a user in the database collection by nodeID.
func FindUser(collection *mongo.Collection, nodeID string) *models.User {
	filter := bson.M{"node_id": nodeID}

	var user models.User
	err := collection.FindOne(context.Background(), filter).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil
		}
	}

	return &user
}
