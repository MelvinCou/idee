package unit

import (
	"context"
	"server/configs"
	"testing"
)


func TestConnectToDB(t *testing.T) {

	client, err := configs.ConnectToDB()
	if err != nil {
		t.Fatalf("Error when try to connect to database : %v", err)
	}

	err = client.Disconnect(context.Background())
	if err != nil {
		t.Fatalf("Error during database deconnection : %v", err)
	}
}
