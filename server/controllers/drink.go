package controllers

import (
	"net/http"
	"server/graphql"
	"server/utils"

	"github.com/gin-gonic/gin"
)

type DrinkParams struct {
	City string `query:"city" binding:"required" example:"Paris"`
	Page int    `query:"page" binding:"required,gte=1" example:"1"`
}

// Drink godoc
//
//	@Summary		Total
//	@Description	Get available drinks (bars, bistros) in a city
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Param			params	query		controllers.DrinkParams	true	"City and page parameters"
//	@Success		200		{object}	graphql.GetDrinksResponse
//	@Failure		500		{object}	graphql.Error
//	@Router			/drink [get]
func Drink(ctx *gin.Context) {
	var p DrinkParams
	if err := ctx.ShouldBindQuery(&p); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r, err := graphql.GetDrinks(ctx, graphql.GetClient(), p.City, utils.GetFromForGraphQL(p.Page), 20)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	} else {
		ctx.JSON(http.StatusOK, r)
	}
}
