const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./models');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport')
const app = express();
initializePassport(passport);


// Middleware pour parser les requêtes URL-Encoded et JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir les fichiers statiques depuis le répertoire 'uploads'
app.use('/uploads', express.static('uploads'));


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
app.set('views', './views');


// Importer les fichiers de routes
const homeRoutes = require('./routes/home');
const destinationsRoutes = require('./routes/destinations');
const hebergementsRoutes = require('./routes/hebergements');
const blogRoutes = require('./routes/blog');
const hoteRoutes = require('./routes/hote');
const authRoutes = require('./routes/auth'); // Importer les routes auth
const bookingRoutes = require('./routes/booking');

// Utiliser les fichiers de routes
app.use('/', homeRoutes);
app.use('/destinations', destinationsRoutes);
app.use('/hebergements', hebergementsRoutes);
app.use('/blog', blogRoutes);
app.use('/hote', hoteRoutes);
app.use('/auth', authRoutes); // Utiliser les routes auth
app.use('/booking', bookingRoutes);

// Redirection de /login vers /auth/login
app.get('/login', (req, res) => {
    res.redirect('/auth/login');
});

app.get('/register', (req, res) => {
    res.redirect
    ('/auth/register');
});

// Redirection des requêtes POST pour /register vers /auth/register
app.post('/register', (req, res) => {
  res.redirect(307, '/auth/register'); // Utiliser un code de statut 307 pour préserver la méthode POST
});


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
