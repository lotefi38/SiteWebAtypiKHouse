const express = require('express');
const router = express.Router();
const db = require('../models');

// Route pour afficher tous les hébergements
router.get('/', async (req, res) => {
  try {
    const housings = await db.Housing.findAll();
    res.render('hebergements', { housings });
  } catch (err) {
    console.error('Error fetching housings:', err);
    res.status(500).send('Server Error');
  }
});

// Route pour afficher le formulaire d'ajout d'un hébergement
router.get('/add', (req, res) => {
  res.render('add-hebergement');
});

// Route pour ajouter un nouvel hébergement
router.post('/add', async (req, res) => {
  const { title, description, type, price, capacity } = req.body;
  try {
    await db.Housing.create({ title, description, type, price, capacity });
    res.redirect('/hebergements');
  } catch (err) {
    console.error('Error adding housing:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


