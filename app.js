const express = require('express');
require('dotenv').config();
const db = require('./db'); // Import the db connection
const bodyParser = require('body-parser');
const db = require('./models');
const session = require('express-session');
const passport = require('passport');

const app = express();
initializePassport(passport);


// Middleware pour parser les requêtes URL-Encoded et JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour les sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  

// Servir les fichiers statiques
app.use(express.static('public'));

// Définir le moteur de vue EJS
app.set('view engine', 'ejs');

// Importer les fichiers de routes
const homeRoutes = require('./routes/home');
const destinationsRoutes = require('./routes/destinations');
const hebergementsRoutes = require('./routes/hebergements');
const blogRoutes = require('./routes/blog');
const hoteRoutes = require('./routes/hote');

// Utiliser les fichiers de routes
app.use('/', homeRoutes);
app.use('/destinations', destinationsRoutes);
app.use('/hebergements', hebergementsRoutes);
app.use('/blog', blogRoutes);
app.use('/hote', hoteRoutes);

// Définir une route simple
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

  // Synchroniser les modèles avec la base de données
  db.sequelize.sync().then(() => {
    console.log('Database synchronized');
  }).catch(err => {
    console.error('Error synchronizing database:', err);
  });

// Démarrer le serveur
const port = 3000; // Changez le port ici
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
