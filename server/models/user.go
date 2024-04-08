package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID     *primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Login  string              `bson:"login" json:"login"`
	Name   string              `bson:"name" json:"name"`
	NodeID string              `bson:"node_id" json:"node_id"`
}
