package api

import (
	"log"
	"net/http"
)

func Server() {
	http.HandleFunc("GET /healthz", healthz)
	http.HandleFunc("GET /deployments", Deployments)
	http.HandleFunc("POST /deployments", Deploy)
	http.HandleFunc("GET /deployments", GetDeployments)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
