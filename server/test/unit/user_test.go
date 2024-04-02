package unit

import (
	"flag"
	"server/models"
	"server/services"
	"testing"

	"github.com/stretchr/testify/assert"
)

// In case of launching test in your computer, you can use the following commented code and update test.sh file with -MONGODB_URI=uri
func init() {
    flag.StringVar(&MONGODB_URI, "MONGODB_URI", "", "Database mongodb_uri")
}

func TestCreateUser(t *testing.T) {
	t.Setenv("MONGODB_URI", MONGODB_URI)

	response := services.CreateUser(models.User{
		Name:  "Jean",
		Email: "jean@epitech.eu",
	})

	assert.Equal(t, response, "User created")
}
