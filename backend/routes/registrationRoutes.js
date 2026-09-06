const express = require('express');
const router = express.Router();
const { registerForEvent, getRegistrationsForEvent } = require('../controllers/registrationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/:eventId', registerForEvent);
router.get('/:eventId', protect, adminOnly, getRegistrationsForEvent);

module.exports = router;