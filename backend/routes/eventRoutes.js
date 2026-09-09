const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const {protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/',protect, adminOnly, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

module.exports = router;