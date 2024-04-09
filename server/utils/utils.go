package utils

import "log"

func GetFromForGraphQL(page int) int {
	if page < 0 {
		log.Fatalf("page must be greather than or equal to 0")
	}

	return 20 * (page - 1)
}
