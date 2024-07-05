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


   // Set the view engine to EJS
app.set('view engine', 'ejs');

 



   // Define a simple route
app.get('/', (req, res) => {
res.render('index'); // Render the index.ejs file
   });

   



   // Démarrer le serveur
const port = 3000;  // Changez le port ici
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});