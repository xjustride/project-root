Lista Przedmiotów - CRUD z Docker, Kubernetes i MySQL

Opis Projektu

Projekt to aplikacja backendowa CRUD (Create, Read, Update, Delete) do zarządzania przedmiotami, zbudowana z:

Backend: Node.js, Express.js

Baza danych: MySQL

Konteneryzacja: Docker, Kubernetes (Minikube)

Struktura Projektu

project-root/
├── backend/
├── frontend/
├── k8s/
└── docker-compose.yaml

Uruchamianie Projektu

1. Wymagania

Docker, Docker Compose

Minikube, kubectl

2. Budowanie i uruchamianie

# Budowanie obrazów
docker build -t backend:latest ./backend

# Start klastra Minikube
minikube start

# Deployment do Kubernetes
kubectl apply -f k8s/

3. Sprawdzenie statusu

kubectl get pods
kubectl get services

4. Testowanie API

curl http://<BACKEND_IP>:<PORT>/api/items

Technologie

Backend: Node.js, Express

Baza danych: MySQL

Docker: Konteneryzacja

Kubernetes: Orkiestracja

Komendy diagnostyczne

kubectl logs -l app=backend
kubectl exec -it backend-deployment-xxxx -- /bin/sh

MySQL:

kubectl exec -it db-deployment-xxxx -- mysql -h db-service -u root -prootpassword
SHOW DATABASES;

Autorzy

Projekt opracowany przez [Twoje Imię i Nazwisko] w ramach nauki Kubernetes, Dockera oraz CI/CD.

Licencja

Projekt udostępniony na licencji MIT.

