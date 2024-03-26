package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

type Config struct {
	GithubLoginConfig oauth2.Config
}

var AppConfig Config

func GithubConfig() oauth2.Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Some error occured. Err: %s", err)
	}

	AppConfig.GithubLoginConfig = oauth2.Config{
		RedirectURL:  "http://localhost:8080/github_callback",
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Scopes:       []string{"user"},
		Endpoint:     github.Endpoint,
	}

	return AppConfig.GithubLoginConfig
}
