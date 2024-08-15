package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Collection *mongo.Collection

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file", err)
	}

	connectionString := os.Getenv("MONGODB_URI")
	const dbName = "stockregister"
	const colName = "staff"

	clientOptions := options.Client().ApplyURI(connectionString)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal("Cannot connect to database", err)
	}

	fmt.Println("Connected to MongoDB!")

	Collection = client.Database(dbName).Collection(colName)

	fmt.Println("Collection instance created")
}
