package controllers

import (
	"net/http"
	"server/graphql"
	"server/utils"

	"github.com/gin-gonic/gin"
)

type EatParams struct {
	City string `form:"city" binding:"required" example:"Paris"`
	Page int    `form:"page" binding:"required,gte=1" example:"1"`
}

// Eat godoc
//
//	@Summary		Eat
//	@Description	Get available eat (restaurants, bistros) in a city
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Param			params	query		controllers.EatParams	true	"City and page parameters"
//	@Success		200		{object}	graphql.GetEatsResponse
//	@Failure		400		{object}	graphql.Error	"Bad Request"
//	@Failure		500		{object}	graphql.Error	"Internal Server Error"
//	@Router			/eat [get]
func Eat(ctx *gin.Context) {
	var p EatParams
	if err := ctx.ShouldBindQuery(&p); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	from, err := utils.GetFromForGraphQL(p.Page)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r, err := graphql.GetEats(ctx, graphql.GetClient(), p.City, from, utils.ElementByPage)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	} else {
		ctx.JSON(http.StatusOK, r)
	}
}
