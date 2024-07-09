const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');

// Route pour afficher le formulaire d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

// Route pour gérer l'inscription
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.User.create({ username, email, password: hashedPassword });
    res.redirect('/login');
  } catch (e) {
    console.log(e);
    res.redirect('/register');
  }
});

// Route pour afficher le formulaire de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Route pour gérer la connexion
router.post('/login', (req, res, next) => {
  console.log('Attempting to authenticate user');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return next(err);
      }
      console.log('Authentication successful, redirecting to home page');
      return res.redirect('/');
    });
  })(req, res, next);
});

// Route pour gérer la déconnexion
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
