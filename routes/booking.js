const express = require('express');
const router = express.Router();
const db = require('../models');
const { ensureAuthenticated } = require('../config/auth');

// Route pour afficher les réservations de l'utilisateur
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const bookings = await db.Booking.findAll({
      where: { UserId: req.user.id },
      include: [{ model: db.Housing }]
    });
    res.render('bookings', { bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).send('Server Error');
  }
});

// Route pour afficher le formulaire d'ajout de réservation
router.get('/add', ensureAuthenticated, async (req, res) => {
  try {
    const housings = await db.Housing.findAll();
    res.render('add-booking', { housings });
  } catch (err) {
    console.error('Error fetching housings:', err);
    res.status(500).send('Server Error');
  }
});

// Route pour gérer l'ajout de réservation
router.post('/add', ensureAuthenticated, async (req, res) => {
  const { startDate, endDate, housingId } = req.body;
  try {
    await db.Booking.create({
      startDate,
      endDate,
      HousingId: housingId,
      UserId: req.user.id
    });
    res.redirect('/bookings');
  } catch (err) {
    console.error('Error adding booking:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
