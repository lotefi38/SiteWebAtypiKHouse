const express = require('express');
const router = express.Router();

// Route pour la page des destinations
router.get('/', (req, res) => {
  res.render('destinations');
});

