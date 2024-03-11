package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"

	docs "server/docs"

	swaggerFiles "github.com/swaggo/files"

	"fmt"
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
//	@host						localhost:8080
//	@BasePath					/api
//	@securityDefinitions.basic	BasicAuth
//	@externalDocs.description	OpenAPI
//	@externalDocs.url			https://swagger.io/resources/open-api/
func main() {
	r := gin.Default()
	docs.SwaggerInfo.BasePath = "/"

	api := r.Group("/api")

	{
		api.GET("/ping", Ping)
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	if err := r.Run(); err != nil { // listen and serve on 0.0.0.0:8080
		fmt.Printf("%+v\n", err)
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
