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
        <div className="page">
            <h1>Upcoming Events</h1>
                {events.length === 0 ? (
                    <p>No events available right now.</p>
                ) : (
                    <div>
                        {events.map((event) => (
                            <div className="event-card" key={event._id}>
                                <h2>{event.title}</h2>
                                <p>{new Date(event.date).toLocaleDateString()} — {event.location}</p>
                                <p>{event.description}</p>
                                <span className="price-tag">{event.price === 0 ? 'Free' : `₹${event.price}`}</span>
                                <br /><br />
                                <Link to={`/events/${event._id}`}>View Details →</Link>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default Home;