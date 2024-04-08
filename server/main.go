package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	ginSwagger "github.com/swaggo/gin-swagger"

	"server/configs"
	"server/controllers"
	docs "server/docs"
	g "server/graphql"

	"github.com/Khan/genqlient/graphql"
	swaggerFiles "github.com/swaggo/files"
)

//	@title						Idee API
//	@version					1.0
//	@description				This is the API of the Idee project!
//	@termsOfService				http://swagger.io/terms/
//	@contact.name				API Support
//	@contact.url				http://www.swagger.io/support
//	@contact.email				support@swagger.io
//	@license.name				Apache 2.0
//	@license.url				http://www.apache.org/licenses/LICENSE-2.0.html
//	@securityDefinitions.basic	BasicAuth
//	@externalDocs.description	OpenAPI
//	@externalDocs.url			https://swagger.io/resources/open-api/
func main() {
	// Get .env file. Do not handle error: using environnement variables by default
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file. using environnement variables")
	}
	datatourisme := os.Getenv("DATATOURISME_URI")
	if datatourisme == "" {
		log.Fatal("Please set DATATOURISME_URI")
	}
	datatourismeClient := http.Client{}
	g.Client = graphql.NewClient(datatourisme, &datatourismeClient)

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

	configs.GithubConfig()

	docs.SwaggerInfo.BasePath = "/api"
	docs.SwaggerInfo.Host = os.Getenv("SWAGGER_HOST")

	api := r.Group("/api")

	{
		api.GET("/total", controllers.Total)
	}

	r.GET("/github_login", controllers.GithubLogin)
	r.GET("/github_callback", controllers.GithubCallback)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	if err := r.Run(); err != nil { // listen and serve on 0.0.0.0:8080
		log.Printf("%+v\n", err)
	}
}
