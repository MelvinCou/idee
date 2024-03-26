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
		Secure:   true, // Assurez-vous que Secure est activé pour les connexions HTTPS uniquement
		SameSite: http.SameSiteStrictMode, // Vous pouvez choisir entre SameSiteStrictMode, SameSiteLaxMode, ou SameSiteNoneMode selon vos besoins
	}

	// Ajoutez le cookie à la réponse
	http.SetCookie(c.Writer, &cookie)

	// Redirection de l'utilisateur vers le frontend avec le jeton d'accès dans l'URL
	c.Redirect(http.StatusFound, "http://localhost:5173")
}
