package integration

import (
	"net/http"
	"net/http/httptest"
	"server/graphql"
	"testing"

	"github.com/gin-gonic/gin/binding"
	"github.com/stretchr/testify/assert"
)

const (
	endpointSleep = "/api/sleep"
)

func TestGetSleepBadRequest(t *testing.T) {
	// Create an HTTP request recorder
	w := httptest.NewRecorder()

	// Create an HTTP GET request
	req, _ := http.NewRequest("GET", endpointSleep, http.NoBody)

	// Execute the HTTP request
	r.ServeHTTP(w, req)

	// Check the HTTP status code is BadRequest
	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestGetSleepFromParis(t *testing.T) {
	var resp graphql.GetSleepsResponse
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", endpointSleep+"?city=Paris&page=1", http.NoBody)
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
