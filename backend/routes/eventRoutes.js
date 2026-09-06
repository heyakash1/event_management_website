const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventById } = require('../controllers/eventController');
const {protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/',protect, adminOnly, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);

module.exports = router;