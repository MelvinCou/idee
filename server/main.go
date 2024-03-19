package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	ginSwagger "github.com/swaggo/gin-swagger"

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
//	@host						localhost:8080/api
//	@BasePath					/api
//	@securityDefinitions.basic	BasicAuth
//	@externalDocs.description	OpenAPI
//	@externalDocs.url			https://swagger.io/resources/open-api/
func main() {
	// Do not handle error
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file. using environnement variables")
	}
	datatourisme := os.Getenv("DATATOURISME_URI")
	log.Println(datatourisme)
	if datatourisme == "" {
		log.Fatal("Please set DATATOURISME_URI")
	}
	datatourismeClient := http.Client{}
	g.Client = graphql.NewClient(datatourisme, &datatourismeClient)
	log.Println(g.Client)

	r := gin.Default()
	r.Use(cors.Default())
	docs.SwaggerInfo.BasePath = "/"

	api := r.Group("/api")

	{
		api.GET("/ping", Ping)
		api.GET("/total", controllers.Total)
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	if err := r.Run(); err != nil { // listen and serve on 0.0.0.0:8080
		log.Printf("%+v\n", err)
	}
}

// Ping godoc
//
//	@Summary		Ping
//	@Description	Ping the server
//	@Tags			ping
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	Response
//	@Failure		400	{string}	string	"Bad Request"
//	@Failure		404	{string}	string	"Not Found"
//	@Failure		500	{string}	string	"Internal Server Error"
//	@Router			/ping [get]
func Ping(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, Response{Message: "pong"})
}

type Response struct {
	Message string `json:"message" example:"pong"`
}
