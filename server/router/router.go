package router

import (
	"net/http"
	"server/controllers"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Middleware CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	})

	api := r.Group("/api")

	{
		api.GET("/drink", controllers.Drink)
		// api.GET("/eat", controllers.Eat)
		api.GET("/enjoy", controllers.Enjoy)
		api.GET("/sleep", controllers.Sleep)
		api.GET("/total", controllers.Total)
	}

	r.GET("/github_login", controllers.GithubLogin)
	r.GET("/github_callback", controllers.GithubCallback)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return r
}
