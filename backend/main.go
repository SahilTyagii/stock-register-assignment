package main

import (
	"apis/router"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file", err)
	}

	r := router.Router()

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(r)

	fmt.Println("Server is running on port 8000")
	log.Fatal(http.ListenAndServe(":8000", corsHandler))
}
