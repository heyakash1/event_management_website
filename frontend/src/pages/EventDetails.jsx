import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [registering, setRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`);
                setEvent(response.data);
            } catch (err) {
                setError('Event not found.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegistering(true);
        setMessage('');

        try {
            await api.post(`/registrations/${id}`, { name, email });
            setMessage('You are successfully registered for this event!');
            setMessageType('success');
            setName('');
            setEmail('');
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
            setMessage(errorMsg);
            setMessageType('error');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <p style={{ textAlign: 'center' }}>Loading event...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

    return (
        <div className="page">
            <Link to="/">&larr; Back to all events</Link>
            <h1>{event.title}</h1>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> {event.price === 0 ? 'Free' : `₹${event.price}`}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            <p>{event.description}</p>

            <hr style={{ margin: '24px 0' }} />

            <h2>Register for this event</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                </div>
                <button type="submit" className="btn" disabled={registering}>
                    {registering ? 'Registering...' : 'Register'}
                </button>
            </form>

            {message && (
                <p className={messageType === 'success' ? 'message-success' : 'message-error'}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default EventDetails;