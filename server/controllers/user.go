package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"server/configs"

	"github.com/gin-gonic/gin"
	// "go.mongodb.org/mongo-driver/bson"
)

func CreateUserHandler(ctx *gin.Context) {
	// var user User

	// err := json.NewDecoder(r.Body).Decode(&user)
	// if err != nil {
	// 	http.Error(w, "Bad request", http.StatusBadRequest)
	// 	return
	// }

	err := createUser(User{
		Name:  "Jean",
		Email: "jean@epitech.eu",
	})

	if err != nil {
		fmt.Print("HAHAHAHHA")
		// http.Error(w, "Failed to add user", http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusCreated, Response{Message: "user created"})
}

func createUser(user User) error {
	collection, _ := configs.GetCollection("users")

	// Insertion d'un document
	insertResult, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		log.Fatalf("Erreur lors de l'insertion du document : %v", err)
	}

	// Affichage de l'ID du document inséré
	fmt.Printf("Document inséré avec l'ID : %v\n", insertResult.InsertedID)

	return nil
}

type User struct {
	Name  string `bson:"name"`
	Email string `bson:"email"`
}

type Response struct {
	Message string `json:"message" example:"pong"`
}
