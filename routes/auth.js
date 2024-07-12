const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Route de login
router.get('/auth/login', (req, res) => {
  res.render('login', { error: req.flash('error') });
});


router.post('/auth/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  failureFlash: true
}), (req, res) => {
  if (req.session.returnTo) {
    const returnTo = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(returnTo);
  } else {
    res.redirect('/profile');
  }
});

// Route de registre
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', upload.single('photo'), async (req, res) => {
  const { username, email, password, firstName, lastName, phone, address } = req.body;
  try {
    // Vérification préalable
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('register', { error: 'Email already registered. Please use another one.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      address,
      photo: req.file ? req.file.path : null
    });
    res.redirect('/auth/login');
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.errors[0].path === 'username') {
        return res.render('register', { error: 'Username already taken. Please choose another one.' });
      }
      if (error.errors[0].path === 'email') {
        return res.render('register', { error: 'Email already registered. Please use another one.' });
      }
    }
    console.error('Error registering user:', error);
    res.render('register', { error: 'An error occurred during registration. Please try again.' });
  }
});

router.get('/profile', async (req, res) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;  // Sauvegarder l'URL de la page d'origine
    return res.redirect(' /auth/login');
  }
  try {
    const user = await User.findByPk(req.user.id);
    res.render('profile', { user, error: null, success: null });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.render('profile', { user: null, error: 'An error occurred while fetching your profile. Please try again.', success: null });
  }
});

router.post('/profile', upload.single('photo'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, password, confirmPassword } = req.body;

    if (password && password !== confirmPassword) {
      return res.render('profile', { user: req.user, error: 'Passwords do not match.', success: null });
    }

    const user = await User.findByPk(req.user.id);

    if (req.file) {
      user.photo = req.file.path;
    }
    
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.address = address;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.render('profile', { user, error: null, success: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.render('profile', { user: req.user, error: 'An error occurred while updating your profile. Please try again.', success: null });
  }
});

router.post('/profile/delete', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.destroy();
    req.logout();
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.render('profile', { user: req.user, error: 'An error occurred while deleting your profile. Please try again.', success: null });
  }
});

// Route de déconnexion
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;

