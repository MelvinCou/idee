package controllers

import (
	"net/http"

	"server/graphql"
	"server/utils"

	"github.com/gin-gonic/gin"
)

type SleepParams struct {
	City string `form:"city" binding:"required" example:"Paris"`
	Page int    `form:"page" binding:"required,gte=1" example:"1"`
}

// Sleep godoc
//
//	@Summary		Sleep
//	@Description	Get sleep places from our DATATourisme API
//	@Tags			graphql
//	@Accept			json
//	@Produce		json
//	@Param			SleepParams	query		SleepParams	true	"City and page parameters"
//	@Success		200			{object}	graphql.GetSleepsResponse
//	@Failure		400			{object}	graphql.Error	"Bad Request"
//	@Failure		500			{object}	graphql.Error	"Internal Server Error"
//	@Router			/sleep [get]
func Sleep(ctx *gin.Context) {
	var p SleepParams
	if err := ctx.ShouldBindQuery(&p); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	from, err := utils.GetFromForGraphQL(p.Page)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	r, err := graphql.GetSleeps(ctx, graphql.GetClient(), p.City, from, utils.ElementByPage)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	} else {
		ctx.JSON(http.StatusOK, r)
	}
}
