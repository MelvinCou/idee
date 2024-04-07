package controllers

import (
	"server/models"
	"server/services"
	"server/configs"
)

var CreateUserService = services.CreateUser

func CreateUserHandler(user models.User) {
	userCollection, _ := configs.GetCollection("users")

	// Appeler la fonction CreateUser
	CreateUserService(userCollection, user)
}

type Response struct {
	Message string `json:"message" example:"pong"`
}
