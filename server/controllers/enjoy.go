package controllers

import (
	"net/http"

	// "server/graphql"
	// "strconv"

	"github.com/gin-gonic/gin"
)

// Enjoy contains binded and validated data.
type EnjoyQueryParams struct {
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
//	@Success		200					{object}	graphql.GetEnjoyResponse
//	@Failure		500					{object}	graphql.Error
//	@Param			enjoyQueryParams	query		EnjoyQueryParams	true	"enjoyQueryParams"
//	@Router			/enjoy [get]
func Enjoy(ctx *gin.Context) {
	var e EnjoyQueryParams
	if err := ctx.ShouldBindQuery(&e); err == nil {
		ctx.JSON(http.StatusOK, gin.H{"message": "Booking dates are valid!"})
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	// index := 0
	// cityName := ctx.Query("city")
	// page := ctx.Query("page")

	// if cityName == "" {
	// 	ctx.JSON(400, gin.H{"error": "city parameter is missing"})
	// }
	// if page == "" {
	// 	ctx.JSON(400, gin.H{"error": "page parameter is missing"})
	// } else {
	// 	index, _ = strconv.Atoi(page)
	// }

	// r, err := graphql.GetEnjoy(ctx, graphql.Client, cityName, index)
	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, ctx.Error(err))
	// } else {
	// 	ctx.JSON(http.StatusOK, r)
	// }
}
