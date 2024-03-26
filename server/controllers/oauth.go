package controllers

import (
	"context"
	"net/http"

	"server/configs"

	"github.com/gin-gonic/gin"
)

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
		Name:     "access_token",
		Value:    token.AccessToken,
		Path:     "/",
		HttpOnly: true,
		// Secure:   true, // Need to be true if https is active
		SameSite: http.SameSiteStrictMode, // You can choose SameSiteStrictMode, SameSiteLaxMode, or SameSiteNoneMode depending on your needs
	}

	// Send the cookie in the response
	http.SetCookie(c.Writer, &cookie)

	// Redirect the user to the frontend
	c.Redirect(http.StatusFound, "http://localhost:5173")
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
	cookie, err := ctx.Request.Cookie("access_token")

	// Check if the cookie is present
	if err != nil {
		// Manage error if access_token cookie is not present
		ctx.String(http.StatusUnauthorized, "Unauthorized")
		ret
*/
