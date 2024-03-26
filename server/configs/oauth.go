package configs

import (
    "log"
    "os"

    "github.com/joho/godotenv"
    "golang.org/x/oauth2"
    "golang.org/x/oauth2/github"
)

// GithubConfig returns the oauth2 configuration for GitHub authentication.
func GithubConfig() oauth2.Config {
    // Load environment variables from .env file
    err := godotenv.Load()
    if err != nil {
        log.Fatalf("Some error occured. Err: %s", err)
    }

    // Return the oauth2 configuration for GitHub
    return oauth2.Config{
        // RedirectURL is the URL to redirect after a successful GitHub authentication
        RedirectURL:  "http://localhost:8080/github_callback",
        ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
        ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
        // Scopes define the access level the application is requesting
        Scopes:       []string{"user"},
        // Endpoint is the GitHub OAuth endpoint
        Endpoint:     github.Endpoint,
    }
}
