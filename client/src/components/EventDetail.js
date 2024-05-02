import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SeatSelector from './SeatSelector';
import './EventDetail.css'; // Import your CSS file for styling

function EventDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [showSelector, setShowSelector] = useState(false);
    const [bookedSeatsCount, setBookedSeatsCount] = useState(0); 

    const handleBook = () => {
        console.log("Booking seats...");
        setShowSelector(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/events/${params.eventId}`)
            .then(response => setEventDetails(response.data))
            .catch(error => console.error('Error fetching event details:', error));

        axios.get(`http://localhost:3001/api/events/${params.eventId}/booked-seats-count`)
            .then(response => setBookedSeatsCount(response.data))
            .catch(error => console.error('Error fetching booked seats count:', error));
    }, [params.eventId]);

    if (!eventDetails) return <div>Loading...</div>;

    const availablePlaces = 100 - bookedSeatsCount;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="event-detail-container">
            <h1>{eventDetails.eventName}</h1>
            <p>{eventDetails.descript}</p>
            <p>{formatDate(eventDetails.eventDate)}</p>
            <p>{eventDetails.place}</p>
            <p>Available Places: {availablePlaces}</p>
            <img src={`/photos/${eventDetails.eventID}.png`} width="250" height="250" alt="Event" />
            <button className="back-button" onClick={() => navigate('/')}>Back</button>
            <button className="register-button" onClick={() => setShowSelector(true)}>Register</button>
            {showSelector && <SeatSelector onBook={handleBook} eventId={eventDetails.eventID} />}
        </div>
    );
}

export default EventDetail;