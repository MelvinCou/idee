package controllers

import (
	"net/http"

	"server/graphql"
	"server/utils"

	"github.com/gin-gonic/gin"
)

type EnjoyParams struct {
	City string `json:"city" binding:"required"`
	Page int    `json:"page" binding:"required,gte=0"`
}

// Enjoy godoc
//
//	@Summary		Enjoy
//	@Description	Get events|activities from our DATATourisme API
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Param			enjoyQueryParams	query		EnjoyParams	true	"enjoyQueryParams"
//	@Success		200					{object}	graphql.GetEnjoyResponse
//	@Failure		500					{object}	graphql.Error
//	@Router			/enjoy [get]
func Enjoy(ctx *gin.Context) {
	var p EnjoyParams
	if err := ctx.ShouldBindQuery(&p); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	from, err := utils.GetFromForGraphQL(p.Page)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r, err := graphql.GetEnjoy(ctx, graphql.GetClient(), p.City, from, 20)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	} else {
		ctx.JSON(http.StatusOK, r)
	}
}
