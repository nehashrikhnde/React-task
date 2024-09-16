const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your MySQL password
  database: 'notes_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/notes', (req, res) => {
  connection.query('SELECT * FROM notes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/notes', (req, res) => {
  const { note } = req.body;
  connection.query('INSERT INTO notes (text) VALUES (?)', [note], (err) => {
    if (err) throw err;
    res.status(201).send();
  });
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM notes WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
