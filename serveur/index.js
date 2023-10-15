const express = require('express');
const cors = require('cors');

const app = express();
const sequelize = require('./config/database');
const router = require('./routes/index');

// Synchronise les modèles avec la base de données
sequelize.sync({ alter: false })
  .then(() => {
    console.log('La synchronisation avec la base de données est terminée.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation avec la base de données :', error);
  });


// ... Ajoute tes routes et middleware ici ...

// Démarrage du serveur
app.use(cors());
app.use(express.json());
app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
