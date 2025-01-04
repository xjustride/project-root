const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Konfiguracja aplikacji
const app = express();
const port = 8080;

// Middleware
app.use(cors({
    origin: '*', // Umożliwia dostęp z dowolnego źródła
    methods: ['GET', 'POST', 'DELETE'], // Zezwolenie na konkretne metody
    allowedHeaders: ['Content-Type'] // Zezwolenie na konkretne nagłówki
}));
app.use(express.json());

// Konfiguracja bazy danych
const dbConfig = {
    host: process.env.DB_HOST || 'db-service',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'testdb'
};

// Retry logic dla połączenia z bazą danych
function connectWithRetry() {
    const db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error('Błąd połączenia z bazą danych:', err);
            console.log('Ponawianie próby połączenia za 5 sekund...');
            setTimeout(connectWithRetry, 5000); // Retry co 5 sekund
        } else {
            console.log('Połączono z bazą danych.');

            // Tworzenie tabeli, jeśli nie istnieje
            db.query(`
                CREATE TABLE IF NOT EXISTS items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )
            `, (err) => {
                if (err) console.error('Błąd przy tworzeniu tabeli:', err);
                else console.log('Tabela gotowa.');
            });

            // Przypisz obiekt bazy danych do globalnego
            global.db = db;
        }
    });
}

connectWithRetry();

// Endpoint - Pobierz wszystkie elementy
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Endpoint - Dodaj element
app.post('/api/items', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO items (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: result.insertId, name });
        }
    });
});

// Endpoint - Usuń element
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send();
        }
    });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});