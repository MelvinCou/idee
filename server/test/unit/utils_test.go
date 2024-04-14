package unit

import (
	"testing"

	"server/utils"

	"github.com/stretchr/testify/assert"
)

func TestGetFromForGraphQLReturn0(t *testing.T) {
	result, _ := utils.GetFromForGraphQL(1)

	assert.Equal(t, result, 0)

}

func TestGetFromForGraphQLReturn20(t *testing.T) {
	result, _ := utils.GetFromForGraphQL(2)

	assert.Equal(t, result, 20)
}

func TestGetFromForGraphQL_ErrorCase(t *testing.T) {
	result, err := utils.GetFromForGraphQL(0)

	assert.Error(t, err)
	assert.Equal(t, "page must be greater than or equal to 0", err.Error())
	assert.Equal(t, 0, result)
}
