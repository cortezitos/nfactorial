const express = require('express');
const db = require('./db');

const router = express.Router();

// API to get all events
router.get('/events', (req, res) => {
    db.query('SELECT * FROM EVENT', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// API to get specific event details
router.get('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  db.query('SELECT * FROM EVENT WHERE eventID = ?', [eventId], (error, results) => {
      if (error) throw error;
      res.json(results[0] || {});
  });
});

module.exports = router;
