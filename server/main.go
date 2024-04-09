package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	"server/configs"
	docs "server/docs"
	g "server/graphql"
	"server/router"
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

	_ = g.GetClient()

	r := router.SetupRouter()

	configs.GithubConfig()

	docs.SwaggerInfo.BasePath = "/api"
	docs.SwaggerInfo.Host = os.Getenv("SWAGGER_HOST")

	if err := r.Run(); err != nil { // listen and serve on 0.0.0.0:8080
		log.Printf("%+v\n", err)
	}
}
