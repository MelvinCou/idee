package utils

import "fmt"

const (
	ElementByPage = 20
)

func GetFromForGraphQL(page int) (int, error) {
	if page <= 0 {
		return 0, fmt.Errorf("page must be greater than or equal to 0")
	}

	return ElementByPage * (page - 1), nil
}
