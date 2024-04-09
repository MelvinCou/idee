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
//	@Failure		500	{object}	graphql.Error
//	@Router			/total [get]
func Total(ctx *gin.Context) {
	r, err := graphql.GetTotal(ctx, graphql.GetClient())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	} else {
		ctx.JSON(http.StatusOK, r)
	}
}
