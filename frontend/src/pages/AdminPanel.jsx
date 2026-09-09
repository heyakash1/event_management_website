import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function AdminPanel() {
    const { logout } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        title: '', description: '', date: '', location: '', capacity: '', price: ''
    });
    const [editingId, setEditingId] = useState(null);

    const [viewingRegistrations, setViewingRegistrations] = useState(null);
    const [registrations, setRegistrations] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            setEvents(response.data);
        } catch (err) {
            setMessage('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ title: '', description: '', date: '', location: '', capacity: '', price: '' });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/events/${editingId}`, form);
                setMessage('Event updated successfully');
            } else {
                await api.post('/events', form);
                setMessage('Event created successfully');
            }
            resetForm();
            fetchEvents();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleEdit = (event) => {
        setForm({
            title: event.title,
            description: event.description,
            date: event.date.slice(0, 10),
            location: event.location,
            capacity: event.capacity,
            price: event.price
        });
        setEditingId(event._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this event?')) return;
        try {
            await api.delete(`/events/${id}`);
            setMessage('Event deleted');
            fetchEvents();
        } catch (err) {
            setMessage('Failed to delete event');
        }
    };

    const handleViewRegistrations = async (eventId) => {
        try {
            const response = await api.get(`/registrations/${eventId}`);
            setRegistrations(response.data);
            setViewingRegistrations(eventId);
        } catch (err) {
            setMessage('Failed to load registrations');
        }
    };

    if (loading) return <p style={{ textAlign: 'center' }}>Loading admin panel...</p>;

    return (
        <div className="page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Panel</h1>
                <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>

            {message && <p className="message-success">{message}</p>}

            <h2>{editingId ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <div className="form-group">
                    <label>Title</label>
                    <input name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows="3" />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input name="location" value={form.location} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Capacity</label>
                    <input name="capacity" type="number" value={form.capacity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input name="price" type="number" value={form.price} onChange={handleChange} />
                </div>
                <button type="submit" className="btn">{editingId ? 'Update Event' : 'Create Event'}</button>
                    {editingId && (
                    <button type="button" className="btn btn-secondary" onClick={resetForm} style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                    )}
            </form>

            <h2>All Events</h2>
                {events.map((event) => (
                <div className="event-card" key={event._id}>
                    <h3>{event.title}</h3>
                    <p>{new Date(event.date).toLocaleDateString()} — {event.location}</p>
                    <button className="btn" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(event._id)} style={{ marginLeft: '8px' }}>
                        Delete
                    </button>
                    <button className="btn btn-secondary" onClick={() => handleViewRegistrations(event._id)} style={{ marginLeft: '8px' }}>
                        View Registrations
                    </button>

                    {viewingRegistrations === event._id && (
                        <div style={{ marginTop: '10px', paddingLeft: '10px', borderLeft: '3px solid #ddd' }}>
                            <strong>Registrations ({registrations.length}):</strong>
                                {registrations.length === 0 ? (
                                    <p>No one has registered yet.</p>
                                ) : (
                                <ul>
                                    {registrations.map((r) => (
                                        <li key={r._id}>{r.name} — {r.email}</li>
                                    ))}
                                </ul>
                                )}
                        </div>
                    )}
                </div>
                ))}
        </div>
    );
}

export default AdminPanel;