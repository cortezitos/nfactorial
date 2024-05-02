const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'factorial'
});

db.connect(error => {
    if (error) throw error;
    console.log('Database connected successfully');
});

// API to get events
app.get('/api/events', (req, res) => {
    db.query('SELECT * FROM EVENT', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// API to get specific event details
app.get('/api/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  db.query('SELECT * FROM EVENT WHERE eventID = ?', [eventId], (error, results) => {
      if (error) throw error;
      res.json(results[0] || {});
  });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
