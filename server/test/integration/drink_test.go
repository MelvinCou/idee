package integration

import (
	"net/http"
	"net/http/httptest"
	"os"
	"server/graphql"
	"server/router"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/stretchr/testify/assert"
)

const (
	endpointDrink = "/api/drink"
)

var r *gin.Engine

func TestMain(m *testing.M) {
	// Setup
	r = router.SetupRouter()

	// Run tests
	code := m.Run()

	os.Exit(code)
}

func TestGetDrinkBadRequest(t *testing.T) {
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", endpointDrink, http.NoBody)
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestGetDrinkFromParis(t *testing.T) {
	var resp graphql.GetDrinksResponse
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", endpointDrink+"?city=Paris&page=1", http.NoBody)
	r.ServeHTTP(w, req)

	assert.Equal(t, w.Code, http.StatusOK)
	if err := binding.JSON.BindBody(w.Body.Bytes(), &resp); err != nil {
		assert.Fail(t, err.Error())
	}

	assert.GreaterOrEqual(t, resp.Poi.Total, 1)
	for _, result := range resp.Poi.Results {
		assert.GreaterOrEqual(t, len(result.Rdfs_label), 1)
		assert.GreaterOrEqual(t, len(result.Rdfs_comment), 0)
	}
}
