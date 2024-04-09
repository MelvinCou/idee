package unit

import (
	"testing"

	"server/utils"

	"github.com/stretchr/testify/assert"
)

func TestGetFromForGraphQLReturn0(t *testing.T) {
	result := utils.GetFromForGraphQL(1)

	assert.Equal(t, result, 0)

}

func TestGetFromForGraphQLReturn20(t *testing.T) {
	result := utils.GetFromForGraphQL(2)

	assert.Equal(t, result, 20)
}

func TestGetFromForGraphQLReturnError(t *testing.T) {
	result := utils.GetFromForGraphQL(-1)

	assert.Equal(t, result, "page must be greather than or equal to 0")
}
