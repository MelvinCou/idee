package unit

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
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

func TestFindOneUserService(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("test find user with nil return", func(mt *mtest.T) {
		collection := mt.Coll
		mt.AddMockResponses(
			mtest.CreateCursorResponse(0, "namespace.collection", mtest.FirstBatch),
		)

		user := services.FindUser(collection, user.Email)

		assert.Nil(t, user)
	})

	mt.Run("test find user with user return", func(mt *mtest.T) {
		objectID := primitive.NewObjectID()

		collection := mt.Coll
		mt.AddMockResponses(
			mtest.CreateCursorResponse(1, "namespace.collection", mtest.FirstBatch, bson.D{
				{Key: "_id", Value: objectID},
				{Key: "email", Value: user.Email},
				{Key: "name", Value: user.Name},
			}),
		)

		foundUser := services.FindUser(collection, user.Email)

		assert.NotNil(t, foundUser)
		assert.Equal(t, user.Email, foundUser.Email)
		assert.Equal(t, user.Name, foundUser.Name)
		assert.Equal(t, objectID, *foundUser.ID)
	})
}

func TestCreateUserHandlerWithUserCreated(t *testing.T) {
	create := controllers.CreateUserService
	find := controllers.FindOneUserService

	// Save current function and restore at the end:
	oldCreate := create
	oldFind := find
	defer func() { controllers.CreateUserService = oldCreate }()
	defer func() { controllers.FindOneUserService = oldFind }()

	controllers.FindOneUserService = func(collection *mongo.Collection, email string) *models.User {
		return nil
	}

	controllers.CreateUserService = func(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
		objectID := primitive.NewObjectID()
		return &mongo.InsertOneResult{InsertedID: objectID}, nil
	}

	// Call the tested function
	controllers.CreateUserHandler(user)

	// Check expected behavior
	assert.Nil(t, err)                            // Check that there is no error
	assert.NotNil(t, insertResult)                 // Check that insertResult is not nil
	assert.IsType(t, &mongo.InsertOneResult{}, insertResult) // Check the type of insertResult

	// Check the inserted ID
	insertedID, ok := insertResult.InsertedID.(primitive.ObjectID)
	assert.True(t, ok)                            // Check that casting to ObjectID is successful
	assert.Equal(t, user.ID.Hex(), insertedID.Hex())  // Check that the inserted ID matches the user's ID
}


func TestCreateUserHandlerWithNotUserCreated(t *testing.T) {
	create := controllers.CreateUserService
	// Save current function and restore at the end:
	old := create
	defer func() { create = old }()

	controllers.CreateUserService = func(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
		return nil, nil
	}

	// Call the tested function
	controllers.CreateUserHandler(user)

	// Check expected behavior
}