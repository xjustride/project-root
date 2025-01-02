const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('WITAMY W API!');
});

router.get('/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

router.post('/echo', (req, res) => {
    const { body } = req; 
    res.json({ received: body });
});

module.exports = router;