package controllers

import (
	"net/http"
	"server/graphql"
	"server/utils"

	"github.com/gin-gonic/gin"
)

type TravelParams struct {
	City string `form:"city" binding:"required" example:"Paris"`
	Page int    `form:"page" binding:"required,gte=1" example:"1"`
}

// Travel godoc
//
//	@Summary		Travel
//	@Description	Get available travel (bus station, train station, ...) in a city
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Param			params	query		controllers.TravelParams	true	"City and page parameters"
//	@Success		200		{object}	graphql.GetTravelsResponse
//	@Failure		400		{object}	graphql.Error	"Bad Request"
//	@Failure		500		{object}	graphql.Error	"Internal Server Error"
//	@Router			/travel [get]
func Travel(ctx *gin.Context) {
	var p TravelParams
	if err := ctx.ShouldBindQuery(&p); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	from, err := utils.GetFromForGraphQL(p.Page)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r, err := graphql.GetTravels(ctx, graphql.GetClient(), p.City, from, utils.ElementByPage)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	} else {
		ctx.JSON(http.StatusOK, r)
	}
}
