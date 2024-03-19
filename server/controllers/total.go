package controllers

import (
	"net/http"
	"server/graphql"

	"github.com/gin-gonic/gin"
)

// Total godoc
//
//	@Summary		Total
//	@Description	Get total number of objets in database
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	graphql.GetTotalResponse
//	@Failure		500	{string}	string	"Internal Server Error"
//	@Router			/total [get]
func Total(ctx *gin.Context) {
	r, err := graphql.GetTotal(ctx, graphql.Client)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	ctx.JSON(http.StatusOK, r)
}
