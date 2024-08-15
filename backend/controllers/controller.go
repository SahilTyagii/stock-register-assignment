package controllers

import (
	"apis/helper"
	"apis/models"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func respondWithError(w http.ResponseWriter, code int, msg string) {
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func GetAllStaff(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	allStaff, err := helper.GetAllStaffs()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	json.NewEncoder(w).Encode(allStaff)
}

func CreateStaff(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")
	var staff models.Staff
	err := json.NewDecoder(r.Body).Decode(&staff)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	err = helper.CreateStaff(staff)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	json.NewEncoder(w).Encode(staff)
}

func UpdateRole(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "PUT")
	params := mux.Vars(r)
	var roleData struct {
		Role string `json:"role"`
	}
	if err := json.NewDecoder(r.Body).Decode(&roleData); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	if err := helper.UpdateRole(params["id"], roleData.Role); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"message": "Role updated successfully"})
}
