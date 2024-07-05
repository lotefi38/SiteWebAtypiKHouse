const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db'); // Import the db connection
const bodyParser = require('body-parser');


   // Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

   // Servir les fichiers statiques
app.use(express.static('public'));


   // definir le moteur de vue EJS
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
app.use('/hote', hoteRoutes)



   // Definir la simple route
app.get('/', (req, res) => {
res.render('index'); // Render the index.ejs file
   });

   



   // Démarrer le serveur
const port = 3000;  // Changez le port ici
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});