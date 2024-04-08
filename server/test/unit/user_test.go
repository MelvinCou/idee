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
	Name:   "Jean Michou",
	Login:  "Jean25",
	NodeID: "mdq6VXNlcjc0MTc35nJa",
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

	mt.Run("test find one user with nil return", func(mt *mtest.T) {
		collection := mt.Coll
		mt.AddMockResponses(
			mtest.CreateCursorResponse(0, "namespace.collection", mtest.FirstBatch),
		)

		user := services.FindUser(collection, user.NodeID)

		assert.Nil(t, user)
	})

	mt.Run("test find one user with user return", func(mt *mtest.T) {
		objectID := primitive.NewObjectID()

		collection := mt.Coll
		mt.AddMockResponses(
			mtest.CreateCursorResponse(1, "namespace.collection", mtest.FirstBatch, bson.D{
				{Key: "_id", Value: objectID},
				{Key: "login", Value: user.Login},
				{Key: "name", Value: user.Name},
				{Key: "node_id", Value: user.NodeID},
			}),
		)

		foundUser := services.FindUser(collection, user.NodeID)

		assert.NotNil(t, foundUser)
		assert.Equal(t, user.NodeID, foundUser.NodeID)
		assert.Equal(t, user.Name, foundUser.Name)
		assert.Equal(t, objectID, *foundUser.ID)
	})
}

func TestCreateUserHandlerWithUserCreated(t *testing.T) {
	create := controllers.CreateUserService
	find := controllers.FindOneUserService

	// Save current functions and restore at the end:
	oldCreate := create
	oldFind := find
	defer func() { controllers.CreateUserService = oldCreate }()
	defer func() { controllers.FindOneUserService = oldFind }()

	// Mock FindOneUserService to return nil (user not found)
	controllers.FindOneUserService = func(collection *mongo.Collection, nodeID string) *models.User {
		return nil
	}

	var capturedUser models.User
	// Mock CreateUserUserService to capture the user passed to it
	controllers.CreateUserService = func(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
		capturedUser = user
		objectID := primitive.NewObjectID()
		return &mongo.InsertOneResult{InsertedID: objectID}, nil
	}

	// Call the tested function
	controllers.CreateUserHandler(user)

	// Check expected behavior
	if capturedUser.NodeID != user.NodeID {
		t.Errorf("Expected user NodeID to be %s, got %s", user.NodeID, capturedUser.NodeID)
	}
}


func TestCreateUserHandlerWithNotUserCreated(t *testing.T) {
	create := controllers.CreateUserService

	// Save current function and restore at the end:
	old := create
	defer func() { create = old }()

	// Mock FindOneUserService to return the expectedUser when called with the correct NodeID
	controllers.FindOneUserService = func(collection *mongo.Collection, nodeID string) *models.User {
		if nodeID == user.NodeID {
			return &user
		}
		return nil
	}

	var createUserCalled bool

	// Mock CreateUserUserService to capture if it's called
	controllers.CreateUserService = func(collection *mongo.Collection, user models.User) (*mongo.InsertOneResult, error) {
		createUserCalled = true
		objectID := primitive.NewObjectID()
		return &mongo.InsertOneResult{InsertedID: objectID}, nil
	}

	// Call the tested function
	controllers.CreateUserHandler(user)

	// Check expected behavior
	if createUserCalled {
		t.Errorf("Expected CreateUserUserService not to be called")
	}
}
