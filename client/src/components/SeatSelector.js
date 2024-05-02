// SeatSelector.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeatSelector.css';

function SeatSelector({ onBook, eventId }) {
    const [seats, setSeats] = useState(Array(10).fill(Array(10).fill({ booked: false, selected: false })));
    const [selectedSeat, setSelectedSeat] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/events/${eventId}/booked-seats`)
            .then(response => {
                const bookedSeats = response.data;
                const updatedSeats = seats.map((row, ri) =>
                    row.map((seat, ci) =>
                        bookedSeats.find(bSeat => bSeat.row === ri && bSeat.col === ci)
                            ? { ...seat, booked: true }
                            : seat
                    )
                );
                setSeats(updatedSeats);
            })
            .catch(error => console.error('Error fetching booked seats:', error));
    }, [eventId, seats]);

    const toggleSeat = (row, col) => {
        if (seats[row][col].booked) return;

        const newSeats = seats.map((r, ri) =>
            r.map((c, ci) =>
                ri === row && ci === col ? { ...c, selected: !c.selected } : c
            )
        );
        setSeats(newSeats);
        setSelectedSeat({ row, col });
    };

    const handleBooking = () => {
        if (!eventId || !selectedSeat) {
            console.error('Event ID or selected seat is undefined');
            return;
        }

        axios.post(`http://localhost:3001/api/events/${eventId}/book`, { place: selectedSeat })
            .then(response => {
                console.log('Booking response:', response.data);
                onBook();
            })
            .catch(error => console.error('Error booking seat:', error));
    };

    return (
        <div className="seat-selector-container">
            {seats.map((row, ri) => (
                <div key={ri} className="seat-row">
                    {row.map((seat, ci) => (
                        <button
                            key={ci}
                            disabled={seat.booked}
                            className={`seat ${seat.booked ? 'booked' : seat.selected ? 'selected' : ''}`}
                            onClick={() => toggleSeat(ri, ci)}
                        />
                    ))}
                </div>
            ))}
            <button className="book-button" onClick={handleBooking}>Book</button>
        </div>
    );
}

export default SeatSelector;
