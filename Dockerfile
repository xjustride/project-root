# Użycie oficjalnego obrazu Node.js
FROM node:20

# Ustawienie katalogu roboczego
WORKDIR /usr/src/app

# Kopiowanie plików konfiguracyjnych
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie kodu aplikacji
COPY . .

# Udostępnienie portu 8080
EXPOSE 8080

# Uruchomienie aplikacji
CMD ["npm", "start"]