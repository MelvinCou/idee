package configs

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


func GetCollection(collectionName string) (*mongo.Collection, error) {
	client, _ := ConnectToDB()

	if client == nil {
		return nil, fmt.Errorf("client is nil")
	}

	return client.Database("t-web-800").Collection(collectionName), nil
}


func ConnectToDB() (*mongo.Client, error) {
	ctx := context.Background()

	// Utilisation de SetServerAPIOptions() pour définir la version de l'API Stable sur le client
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI("mongodb+srv://nokomi:QgPHVAOvC1yIre8s@cluster0.yk2udcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").SetServerAPIOptions(serverAPI)

	// Création d'un nouveau client et connexion au serveur
	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil, err
	}

	return client, nil
}
