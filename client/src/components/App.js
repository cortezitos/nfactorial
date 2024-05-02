import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventDetail from './EventDetail';
import './App.css'; // Import your CSS file for styling

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Router>
            <div className="event-container">
                <h1>Events:</h1>
                <Routes>
                    <Route path="/" element={
                        <div className="events-grid">
                            {events.map((event, index) => (
                                <div key={event.eventID} className="event-frame">
                                    <h2>{event.eventName}</h2>
                                    <img src={`/photos/${index + 1}.png`} width="250" height="250" alt="Event" />
                                    <Link to={`/event/${event.eventID}`}>
                                        <button>View Details</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    } />
                    <Route path="/event/:eventId" element={<EventDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;