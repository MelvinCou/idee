package controllers

import (
	"server/configs"
	"server/models"
	"server/services"
)

var CreateUserService = services.CreateUser
var FindOneUserService = services.FindUser

// CreateUserHandler handles the creation of a new user.
func CreateUserHandler(user models.User) {
	// Get the user collection from the configuration
	userCollection, _ := configs.GetCollection("users")

	// Check if the user already exists in the database
	result := FindOneUserService(userCollection, user.NodeID)

	// If the user doesn't exist, create a new user
	if result == nil {
		CreateUserService(userCollection, user)
	}
}

// Response represents the JSON response for HTTP requests.
type Response struct {
	Message string `json:"message" example:"pong"`
}
