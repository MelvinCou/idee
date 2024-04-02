package unit

import (
	"context"
	// "flag"
	"server/configs"
	"testing"
)

// var MONGODB_URI string

// In case of launching test in your computer, you can use the following commented code and update test.sh file with -MONGODB_URI=uri
// func init() {
//     flag.StringVar(&MONGODB_URI, "MONGODB_URI", "", "Database mongodb_uri")
// }

func TestConnectToDB(t *testing.T) {
	// t.Setenv("MONGODB_URI", MONGODB_URI)

	client, err := configs.ConnectToDB()
	if err != nil {
		t.Fatalf("Error when try to connect to database : %v", err)
	}

	err = client.Disconnect(context.Background())
	if err != nil {
		t.Fatalf("Error during database deconnection : %v", err)
	}
}
