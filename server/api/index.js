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

router.post('/events/:eventId/book', (req, res) => {
    const { eventId } = req.params;
    const { place } = req.body; // place should contain 'row' and 'col'

    const sql = 'INSERT INTO BOOKING (eventID, bookRow, bookColumn) VALUES (?, ?, ?)';
    db.query(sql, [eventId, place.row, place.col], (error, results) => {
        if (error) {
            console.error('Booking failed:', error);
            res.status(500).send('Booking failed');
        } else {
            res.send({ message: 'Booking successful', bookingId: results.insertId });
        }
    });
});

router.get('/events/:eventId/booked-seats', (req, res) => {
    const eventId = req.params.eventId;
    db.query('SELECT bookRow, bookColumn FROM BOOKING WHERE eventID = ?', [eventId], (error, results) => {
        if (error) {
            console.error('Failed to fetch booked seats:', error);
            res.status(500).send('Failed to fetch booked seats');
        } else {
            res.json(results.map(result => ({row: result.bookRow, col: result.bookColumn})));
        }
    });
});

router.get('/events/:eventId/booked-seats-count', (req, res) => {
    const eventId = req.params.eventId;
    db.query('SELECT COUNT(*) AS bookedSeats FROM BOOKING WHERE eventID = ?', [eventId], (error, results) => {
        if (error) {
            console.error('Failed to count booked seats:', error);
            res.status(500).send('Failed to count booked seats');
        } else {
            res.json(results[0].bookedSeats || 0);
        }
    });
});


module.exports = router;
