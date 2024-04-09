package integration

import (
	"net/http"
	"net/http/httptest"
	"server/router"
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	endpoint = "/api/drink"
)

func TestGetDrinkFromParis(t *testing.T) {
	router := router.SetupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", endpoint, nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	//assert.Equal(t, "", w.Body.)
}
