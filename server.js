const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3006;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro_db'
});

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:8066'
}));

require('./register')(app, db, bcrypt);
require('./login')(app, db, bcrypt, jwt);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});