package unit

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"

	"server/controllers"
	"server/models"
	"server/services"
)

var user = models.User{
	Name:  "Jean",
	Email: "jean@epitech.eu",
}

func TestCreateUserService(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("test create user", func(mt *mtest.T) {
		collection := mt.Coll
		mt.AddMockResponses(
			mtest.CreateSuccessResponse(),
		)

		insertResult, err := services.CreateUser(collection, user)

		assert.Nil(t, err)
		assert.Equal(t, len(insertResult.InsertedID.(primitive.ObjectID).Hex()), 24)
	})
}

func TestCreateUserHandler(t *testing.T) {
	create := controllers.CreateUserService
    // Save current function and restore at the end:
    old := create
    defer func() { create = old }()

    controllers.CreateUserService = func(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
        return nil, nil // exemple de retour
    }

    // Call the tested function
    controllers.CreateUserHandler(user)

    // Check expected behavior
}