package integration

// import (
// 	"encoding/json"
// 	"net/http"
// 	"net/http/httptest"

// 	// "server/controllers"
// 	"server/graphql"
// 	"testing"

// 	"github.com/gin-gonic/gin"
// 	"github.com/stretchr/testify/assert"
// )

// func TestEnjoyWithoutStartDateParams(t *testing.T) {
// 	// Initialize the Gin router
// 	r := gin.Default()

// 	// Create an HTTP request recorder
// 	w := httptest.NewRecorder()

// 	// Create an HTTP GET request
// 	req, _ := http.NewRequest("GET", "/enjoy", nil)

// 	// Execute the HTTP request
// 	r.ServeHTTP(w, req)

// 	// Check the HTTP status code
// 	assert.Equal(t, http.StatusOK, w.Code)

// 	// Check the response body
// 	var response graphql.GetTotalResponse
// 	err := w.Result().Body.Close()
// 	assert.NoError(t, err)

// 	err = json.Unmarshal(w.Body.Bytes(), &response)
// 	assert.NoError(t, err)

// 	assert.NotNil(t, response)
// 	// assert.NotNil(t, response.Total)
// }

// func TestTotalWithStartDateParams(t *testing.T) {
// 	// Initialize the Gin router
// 	r := gin.Default()

// 	// Create an HTTP request recorder
// 	w := httptest.NewRecorder()

// 	// Create an HTTP GET request
// 	req, _ := http.NewRequest("GET", "/total", nil)
// 	q := req.URL.Query()
// 	q.Add("start_date", "2024-04-08")  // Ajoutez la date souhaitée ici
// 	req.URL.RawQuery = q.Encode()

// 	// Execute the HTTP request
// 	r.ServeHTTP(w, req)

// 	// Check the HTTP status code
// 	assert.Equal(t, http.StatusOK, w.Code)

// 	// Check the response body
// 	var response graphql.GetTotalResponse
// 	err := w.Result().Body.Close()
// 	assert.NoError(t, err)

// 	err = json.Unmarshal(w.Body.Bytes(), &response)
// 	assert.NoError(t, err)

// 	assert.NotNil(t, response)
// 	// assert.NotNil(t, response.Total)
// }
