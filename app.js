const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const db = require('./models');
const initializePassport = require('./config/passport');

const app = express();
initializePassport(passport);

// Middleware pour parser les requêtes URL-encoded et JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour les sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Servir les fichiers statiques depuis le répertoire 'public'
app.use(express.static('public'));

// Servir les fichiers statiques depuis le répertoire 'uploads'
app.use('/uploads', express.static('uploads'));

// Définir le moteur de vue sur EJS
app.set('view engine', 'ejs');

// Importer les fichiers de routes
const homeRoutes = require('./routes/home');
const destinationsRoutes = require('./routes/destinations');
const hebergementsRoutes = require('./routes/hebergements');
const blogRoutes = require('./routes/blog');
const hoteRoutes = require('./routes/hote');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const themesRoutes = require('./routes/theme'); // Nouvelle ligne pour les thèmes

// Utiliser les fichiers de routes
app.use('/', homeRoutes);
app.use('/destinations', destinationsRoutes);
app.use('/hebergements', hebergementsRoutes);
app.use('/blog', blogRoutes);
app.use('/hote', hoteRoutes);
app.use(authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/themes', themesRoutes); // Nouvelle ligne pour les thèmes

// Synchroniser les modèles avec la base de données
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error synchronizing database:', err);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

