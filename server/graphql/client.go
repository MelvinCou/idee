package graphql

import "github.com/Khan/genqlient/graphql"

var Client graphql.Client

type Error struct {
	Error string `json:"error" example:"string"`
}
