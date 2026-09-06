const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Register for an event
const registerForEvent = async (req, res) => {
    try {
        const { name, email } = req.body;
        const eventId = req.params.eventId;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const registrationCount = await Registration.countDocuments({ event: eventId });
        if (registrationCount >= event.capacity) {
            return res.status(400).json({ message: 'This event is fully booked' });
        }

        const registration = await Registration.create({
            event: eventId,
            name,
            email
        });

        res.status(201).json(registration);
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
};

// Get all registrations for a specific event (admin use)
const getRegistrationsForEvent = async (req, res) => {
    try {
        const registrations = await Registration.find({ event: req.params.eventId });
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerForEvent, getRegistrationsForEvent };