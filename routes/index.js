var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
   //gestion du compteur
   if (!("compteur" in req.session)) { //req.session = appel à la session créée dans le fichier app.js
      req.session.compteur = 0; //on a pas besoin de déclarer compteur avant, on peut utiliser ça comme ça. Compteur variable a nous
   }

   req.session.compteur++;

   res.render('index', {
      title: 'Express',
      quand: new Date().toISOString(), 
      nombreVisites: req.session.compteur
   });
});

module.exports = router;