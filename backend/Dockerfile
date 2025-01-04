# Użyj obrazu Node.js 20
FROM node:20

# Ustaw katalog roboczy
WORKDIR /usr/src/app

# Skopiuj pliki zależności i zainstaluj je
COPY package*.json ./
RUN npm install

# Skopiuj resztę plików
COPY . .

# Otwórz port 8080
EXPOSE 8080

# Uruchom aplikację
CMD ["node", "server.js"]