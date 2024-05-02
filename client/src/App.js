import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams  } from 'react-router-dom';

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Router>
            <div>
                <h1>Events:</h1>
                {events.map((event, index) => (
                    <div key={event.eventID}>
                        <h2>{event.eventName}</h2>
                        <img src={`/photos/${index + 1}.png`} width={250} height={250} alt="Event" />
                        <Link to={`/event/${event.eventID}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
                <Routes>
                    <Route path="/event/:eventId" element={<EventDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

function EventDetail() {
    const params = useParams();
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/events/${params.eventId}`)
            .then(response => {
                setEventDetails(response.data);
            })
            .catch(error => console.error('Error fetching event details:', error));
    }, [params.eventId]);

    if (!eventDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{eventDetails.eventName}</h1>
            <p>{eventDetails.descript}</p>
            <p>{eventDetails.eventDate}</p>
            <img src={`/photos/${eventDetails.eventID}.png`} width={250} height={250} alt="Event" />
        </div>
    );
}

export default App;
