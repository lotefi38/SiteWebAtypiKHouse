const express = require('express');
const router = express.Router();
const db = require('../models');
const { ensureAuthenticated } = require('../config/auth');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route pour afficher le formulaire de création d'un hébergement
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add-hebergement');
});

// Route pour ajouter un nouvel hébergement
router.post('/add', ensureAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const { title, description, type, price, capacity } = req.body;
    const image = req.file ? req.file.path : null;
    await db.Housing.create({
      title,
      description,
      type,
      price,
      capacity,
      image,
      OwnerId: req.user.id,
    });
    res.redirect('/hebergements');
  } catch (error) {
    console.error('Error adding housing:', error);
    res.status(500).send('Server Error');
  }
});

// Route pour afficher les hébergements
router.get('/', async (req, res) => {
  try {
    const housings = await db.Housing.findAll();
    res.render('hebergements', { housings });
  } catch (error) {
    console.error('Error fetching housings:', error);
    res.status(500).send('Server Error');
  }
});

// Route pour afficher un hébergement spécifique
router.get('/:id', async (req, res) => {
  try {
    const housing = await db.Housing.findByPk(req.params.id, {
      include: [{ model: db.Comment }],
    });
    if (housing) {
      res.render('single-hebergement', { housing });
    } else {
      res.status(404).send('Housing not found');
    }
  } catch (error) {
    console.error('Error fetching housing:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
