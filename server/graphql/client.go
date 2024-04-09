package graphql

import (
	"log"
	"net/http"
	"os"

	"github.com/Khan/genqlient/graphql"
)

var client graphql.Client

type Error struct {
	Error string `json:"error" example:"string"`
}

func GetClient() graphql.Client {
	if client == nil {
		datatourisme := os.Getenv("DATATOURISME_URI")
		if datatourisme == "" {
			log.Fatal("Please set DATATOURISME_URI")
		}
		client = graphql.NewClient(datatourisme, &http.Client{})
	}

	return client
}
