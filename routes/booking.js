const express = require('express');
const router = express.Router();
const db = require('../models');
const { ensureAuthenticated } = require('../config/auth');

// Route pour ajouter une réservation
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { housingId, startDate, endDate, guests } = req.body;
    await db.Booking.create({
      housingId,
      userId: req.user.id,
      startDate,
      endDate,
      guests,
    });
    res.redirect('/hebergements/' + housingId);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
