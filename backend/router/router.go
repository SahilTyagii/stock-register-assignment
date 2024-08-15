package router

import (
	"apis/controllers"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/staff", controllers.GetAllStaff).Methods("GET")
	router.HandleFunc("/api/staff", controllers.CreateStaff).Methods("POST")
	router.HandleFunc("/api/staff/role/{id}", controllers.UpdateRole).Methods("PUT")
	return router
}
