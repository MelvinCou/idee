package unit

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"

	"server/models"
	"server/services"
)

func TestCreateUser(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("test create", func(mt *mtest.T) {
		collection := mt.Coll
		mt.AddMockResponses(
			mtest.CreateSuccessResponse(),
		)

		insertResult, err := services.CreateUser(collection, models.User{
			Name:  "Jean",
			Email: "jean@epitech.eu",
		})

		assert.Nil(t, err)
		assert.Equal(t, len(insertResult.InsertedID.(primitive.ObjectID).Hex()), 24)
	})
}
