package integration

import (
	"net/http"
	"net/http/httptest"
	"server/graphql"
	"server/router"
	"testing"

	"github.com/gin-gonic/gin/binding"
	"github.com/stretchr/testify/assert"
)

const (
	endpoint = "/api/drink"
)

func TestGetDrinkBadRequest(t *testing.T) {
	router := router.SetupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", endpoint, http.NoBody)
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestGetDrinkFromParis(t *testing.T) {
	var resp graphql.GetDrinksResponse
	router := router.SetupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", endpoint+"?City=Paris&Page=1", http.NoBody)
	router.ServeHTTP(w, req)

	assert.Equal(t, w.Code, http.StatusOK)
	if err := binding.JSON.BindBody(w.Body.Bytes(), &resp); err != nil {
		assert.Fail(t, err.Error())
	}

	assert.GreaterOrEqual(t, resp.Poi.Total, 1)
	for _, result := range resp.Poi.Results {
		assert.GreaterOrEqual(t, len(result.Rdf_type), 1)
	}
}
