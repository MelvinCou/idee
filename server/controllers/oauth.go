package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"server/configs"

	"server/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

type User struct {
	Login     string `json:"login"`
	AvatarUrl string `json:"avatar_url"`
	Name      string `json:"name"`
}

const accessToken = "access_token"

// GithubLogin handles the GitHub login redirection.
func GithubLogin(c *gin.Context) {
	// Instancie github configuration
	oauth2Config := configs.GithubConfig()

	// Generate github /authorize url
	url := oauth2Config.AuthCodeURL("randomstate")

	// Redirect to the GitHub authentication URL
	c.Redirect(http.StatusSeeOther, url)
}

// GithubCallback handles the GitHub callback after authentication.
func GithubCallback(c *gin.Context) {
	// Retrieve the state parameter from the query
	state := c.Query("state")

	// Check if the state matches the expected value
	if state != "randomstate" {
		c.String(http.StatusBadRequest, "States don't Match!!")
		return
	}

	// Retrieve the code parameter from the query
	code := c.Query("code")

	// Get the GitHub oauth2 configuration
	githubConfig := configs.GithubConfig()

	// Exchange the code for a token
	token, err := githubConfig.Exchange(context.Background(), code)
	if err != nil {
		c.String(http.StatusInternalServerError, "Code-Token Exchange Failed")
		return
	}

	// Create a new cookie with the access token
	cookie := http.Cookie{
		Name:     accessToken,
		Value:    token.AccessToken,
		Path:     "/",
		HttpOnly: true,
		// Secure:   true, // Need to be true if https is active
		SameSite: http.SameSiteStrictMode, // You can choose SameSiteStrictMode, SameSiteLaxMode, or SameSiteNoneMode depending on your needs
	}

	// Send the cookie in the response
	http.SetCookie(c.Writer, &cookie)

	// Fetch and create user
	err = getUserAndCreateIfNotExist(token)
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to fetch and create user")
		return
	}

	// Redirect the user to the frontend
	c.Redirect(http.StatusFound, "http://localhost:5173")
}

func getUserAndCreateIfNotExist(token *oauth2.Token) error {
	// Fetch GitHub user details using the token
	githubUser, err := fetchGithubUser(token)
	if err != nil {
		return err
	}

	// Check if the user already exists and create if not
	CreateUserHandler(*githubUser)

	return nil
}

func fetchGithubUser(token *oauth2.Token) (*models.User, error) {
	// Create a new HTTP request to fetch user details from GitHub API
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return nil, err
	}

	// Set the Authorization header with the token's access token
	req.Header.Set("Authorization", "Bearer "+token.AccessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var user models.User

	// Decode the response body into the user struct
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

// The following function is commented out. Uncomment and add appropriate implementation if needed.

/*
// GithubPOC godoc
//
//	@Summary		GithubPOC
//	@Description	Get cookie from header and check if 401
//	@Tags			github_poc
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	Response
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		401	{string}	string	"Unauthorized"
//	@Failure		404	{string}	string	"Not Found"
//	@Failure		500	{string}	string	"Internal Server Error"
//	@Router			/ping [get]
func GithubPOC(ctx *gin.Context) {
    // Retrieve the access_token cookie from the request
    _, err := ctx.Request.Cookie("access_token")

    // Check if the cookie is present
    if err != nil {
        // Manage error if access_token cookie is not present
        ctx.String(http.StatusUnauthorized, "Unauthorized")
        return
    }

    ctx.JSON(http.StatusOK, Response{Message: "Authorized!"})
}
*/

func IsConnected(ctx *gin.Context) {
	// Retrieve the access_token cookie from the request
	cookie, err := ctx.Request.Cookie(accessToken)

	// Check if the cookie is present
	if err != nil {
		// Manage error if access_token cookie is not present
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
	}
	// Set the Authorization header with the token's access token
	req.Header.Set("Authorization", "Bearer "+cookie.Value)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
	}
	defer resp.Body.Close()

	var user User

	// Decode the response body into the user struct
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
	}

	ctx.JSON(resp.StatusCode, user)
}

func Disconnect(ctx *gin.Context) {
	c := &http.Cookie{
		Name:     accessToken,
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
	}

	http.SetCookie(ctx.Writer, c)

	// Redirect the user to the frontend
	ctx.Redirect(http.StatusFound, "http://localhost:5173")
}
