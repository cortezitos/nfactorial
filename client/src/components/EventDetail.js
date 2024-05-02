import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/events/${params.eventId}`)
            .then(response => setEventDetails(response.data))
            .catch(error => console.error('Error fetching event details:', error));
    }, [params.eventId]);

    if (!eventDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{eventDetails.eventName}</h1>
            <p>{eventDetails.descript}</p>
            <p>{eventDetails.eventDate}</p>
            <img src={`/photos/${eventDetails.eventID}.png`} width="250" height="250" alt="Event" />
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
}

export default EventDetail;
