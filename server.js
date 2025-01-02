const express = require('express');
const mysql = require('mysql2');
const app = express();

const PORT = process.env.PORT || 8080;


const connectWithRetry = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST || 'db', 
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'rootpassword',
        database: process.env.DB_NAME || 'testdb'
    });

    db.connect(err => {
        if (err) {
            console.error('Błąd połączenia z bazą danych, ponawianie za 5 sekund...', err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Połączono z bazą danych MySQL!');
            startServer(db); 
        }
    });
};

const startServer = (db) => {
    app.use(express.json());

    app.get('/api/users', (req, res) => {
        db.query('SELECT NOW() AS currentTime', (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ time: result[0].currentTime });
        });
    });

    app.listen(PORT, () => {
        console.log(`Serwer działa na: http://localhost:${PORT}`);
    });
};

connectWithRetry();