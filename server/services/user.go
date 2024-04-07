package services

import (
	"context"
	"fmt"
	"log"

	"server/models"

	"go.mongodb.org/mongo-driver/mongo"
)

func CreateUser(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
	insertResult, err := collection.InsertOne(context.TODO(), user)

	fmt.Print("User inserted")

	if err != nil {
		log.Fatalf("Error during user insertion : %v", err)
		return nil, err
	}

	return insertResult, nil
}
