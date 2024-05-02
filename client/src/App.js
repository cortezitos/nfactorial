import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Events:</h1>
            {events.map((event, index) => (
                <div key={event.eventID}>
                    <h2>{event.eventName}</h2>
                    <p>{event.eventDate}</p>
                    <p>{event.descript}</p>
                    <img src={`/photos/${index + 1}.png`} alt="Event" />
                </div>
            ))}
        </div>
    );
}

export default App;
