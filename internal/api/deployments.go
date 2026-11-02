package api

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Deployment struct {
	Id int `json:"id"`
	GitUrl string `json:"gitUrl"`
	Status string `json:"status"`
}

type Create struct {
	GitUrl string `json:"gitUrl"`
}

var deployments = []Deployment{}

func Deployments(w http.ResponseWriter, r *http.Request){
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(deployments)
}


func Deploy(w http.ResponseWriter, r *http.Request){
	var url Create

	err := json.NewDecoder(r.Body).Decode(&url)

	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
	}

	if url.GitUrl == "" {
		http.Error(w, "gitUrl required", http.StatusBadRequest)
		return
	}

	deploy := Deployment{
		Id: len(deployments) + 1,
		GitUrl: url.GitUrl,
		Status: "pending",
	}

	deployments = append(deployments, deploy)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(deploy)
}

func GetDeployments(w http.ResponseWriter, r *http.Request){
	id, err := strconv.Atoi(r.PathValue("id"))

	if r.Method != http.MethodGet {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
	}

	if err != nil {
		http.Error(w, "Invalid id", http.StatusBadRequest)
		return
	}

	for _, d := range deployments {
		if d.Id == id {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(d)
			return
		}
	}

	http.Error(w, "deployments not found", http.StatusNotFound)
}