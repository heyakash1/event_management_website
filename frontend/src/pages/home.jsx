import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/events');
                setEvents(response.data);
            } catch (err) {
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading events...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1>Upcoming Events</h1>
            {events.length === 0 ? (
            <p>No events available right now.</p>
        ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
                {events.map((event) => (
            <div
                key={event._id}
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px'
                }}
            >
                <h2>{event.title}</h2>
                <p>{new Date(event.date).toLocaleDateString()} — {event.location}</p>
                <p>{event.description}</p>
                <p><strong>{event.price === 0 ? 'Free' : `₹${event.price}`}</strong></p>
                <Link to={`/events/${event._id}`}>View Details</Link>
            </div>
            ))}
        </div>
        )}
    </div>
    );    
}

export default Home;