const express = require('express');
const router = express.Router();
const auth = require('../config/auth');


module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/auth/login');
    }
  };
  