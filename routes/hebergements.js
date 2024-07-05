
const express = require('express');
const router = express.Router();

// Route pour la page des hébergements
router.get('/', (req, res) => {
  res.render('hebergements');
});

module.exports = router;
