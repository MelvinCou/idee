package controllers

import (
	"context"
	"net/http"

	"server/configs"

	"github.com/gin-gonic/gin"
)

func GithubLogin(c *gin.Context) {
	url := configs.AppConfig.GithubLoginConfig.AuthCodeURL("randomstate")
	c.Redirect(http.StatusSeeOther, url)
}

func GithubCallback(c *gin.Context) {
	state := c.Query("state")
	if state != "randomstate" {
		c.String(http.StatusBadRequest, "States don't Match!!")
		return
	}

	code := c.Query("code")

	githubConfig := configs.GithubConfig()

	token, err := githubConfig.Exchange(context.Background(), code)
	if err != nil {
		c.String(http.StatusInternalServerError, "Code-Token Exchange Failed")
		return
	}

	cookie := http.Cookie{
		Name:     "access_token",
		Value:    token.AccessToken,
		Path:     "/",
		HttpOnly: true,
		// Secure:   true, // Need to be true if https is active
		SameSite: http.SameSiteStrictMode, // You can choose SameSiteStrictMode, SameSiteLaxMode, or SameSiteNoneMode dependings on your need
	}

	// Send cookie
	http.SetCookie(c.Writer, &cookie)

	// Redirect user to the frontend
	c.Redirect(http.StatusFound, "http://localhost:5173")
}

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
// func GithubPOC(ctx *gin.Context) {
// 	cookie, err := ctx.Request.Cookie("access_token")

// 	if err != nil {
// 		// Manage error if cookie access_token is not present
// 		ctx.String(http.StatusUnauthorized, "Unauthorized")
// 		return
// 	}

// 	// Get cookie value
// 	accessToken := cookie.Value

// 	ctx.JSON(http.StatusOK, Response{Message: accessToken})
// }
