package controllers

import (
	"net/http"

	"server/graphql"
	"server/utils"

	"github.com/gin-gonic/gin"
)

type EnjoyParams struct {
	City string `query:"city" binding:"required" example:"Paris"`
	Page int    `query:"page" binding:"required,gte=1" example:"1"`
}

// Enjoy godoc
//
//	@Summary		Enjoy
//	@Description	Get events|activities from our DATATourisme API
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Param			EnjoyParams	query		EnjoyParams	true	"City and page parameters"
//	@Success		200			{object}	graphql.GetEnjoyResponse
//	@Failure		400			{object}	graphql.Error	"Bad Request"
//	@Failure		500			{object}	graphql.Error	"Internal Server Error"
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
