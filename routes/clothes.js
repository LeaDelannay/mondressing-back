var express = require('express');
var router = express.Router();

var dbacc = require('../dbaccess');

//READ ALL CLOTHES
router.get('/', function (req, res, next) {
   console.log("----> call read all clothes");
   dbacc.readClothes(function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      if (data == 0 || data == null || data == undefined || data == "") {
         res.sendStatus(204); //no content
         return;
      }
      res.send(data);
   })
});

//READ ALL CLOTHE NAME
router.get('/clothename/', function (req, res, next) {
   console.log("----> call read all clothes name");
   dbacc.readClothesNames(function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      if (data == 0 || data == null || data == undefined || data == "") {
         res.sendStatus(204); //no content
         return;
      }
      res.send(data);
   })
});

//READ CLOTHE BY ID - UNITAIRE
router.get('/:idClothe', function (req, res, next) {
   console.log("----> call read one clothe");
   dbacc.readSpecificClothe(req.params.idClothe, function (err, data) {
      if (err || data.length != 1) {
         res.sendStatus(500);
         return;
      }
      if (data == 0 || data == null || data == undefined || data == "") {
         res.sendStatus(204); //no content
         return;
      }
      res.send(data[0]);
   })
});


//CREATE CLOTHE
router.post('/', function (req, res, next) {
   console.log("req.body ----> " + req.body);
   var contenuRecuReq = JSON.stringify(req.body);
   console.log("req.body json.stringify ----> " + contenuRecuReq);
   if (!req.body.NOM_VET) {
      res.sendStatus(400);
      return;
   }
   dbacc.createClothe(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      res.send(data);
   })
});

//UPDATE CLOTHE
router.put('/', function (req, res, next) {
   console.log("----> call update one clothe : " + JSON.stringify(req.body));
   if (!req.body.ID_VET) {
      res.sendStatus(400);
      return;
   }
   dbacc.updateClothe(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      if (data != true) {
         res.sendStatus(401);
         return;
      }
      res.sendStatus(204); //renvoie 204 car la requête ne renvoie rien. 204 est pour le front. 
      return;
   })
});

//DELETE CLOTHE
//DEL CLOTHE BY ID - UNITAIRE
router.delete('/:idClothe', function (req, res, next) {
   console.log("----> call delete one clothe");
   if (!req.params.idClothe) {
      res.sendStatus(418); //I'm a teapot - sinon, erreur 400 : la syntaxe de la requête est erronnée
      return;
   }
   dbacc.deleteClothe(req.params.idClothe, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      res.sendStatus(204); //renvoie 204 car la requête ne renvoie rien, mais requete correctement traitée. 204 est pour le front. 
      return;
   })
});

module.exports = router;