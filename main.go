package main

import (
	"html/template"
	"net/http"
)

func init() {
	http.HandleFunc("/", indexHandler)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	indexTemplate := template.Must(template.ParseFiles("index.html"))
	indexTemplate.Execute(w, nil)
}
