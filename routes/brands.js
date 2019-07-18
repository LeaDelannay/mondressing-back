var express = require('express');
var router = express.Router();

var dbacc = require('../dbaccess');


//READ ALL BRANDS NAME
router.get('/brandname/', function (req, res, next) {
   console.log("----> call read all brands name");
   dbacc.readBrandsNames(function (err, data) {
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

 //READ ALL BRANDS
 router.get('/', function(req, res, next) {
   console.log("----> call read all brands");
   dbacc.readBrands(function(err, data){
      if (err){
         res.sendStatus(500);
         return;
      }
      if(data == 0 || data == null || data == undefined || data == ""){
         res.sendStatus(204);
         return;
      }
      res.send(data);
   })
});

//READ TOUS LES VETEMENTS POSSEDANT UNE MARQUE SPECIFIQUE
router.get('/:idBrand', function(req, res, next) {
   console.log("----> call read clothes with idBrand");
   dbacc.readSpecificBrand(req.params.idBrand, function(err, data){
      console.log(data);
      if (err){
         res.sendStatus(500);
         return;
      }
      if(data == 0 || data == null || data == undefined || data == ""){
         res.sendStatus(204); //no content
         return;
      }
      res.send(data);
   })
});

//CREATE BRAND
router.post('/', function (req, res, next) {
   console.log("req.body ----> " + req.body);
   if (!req.body.NOM_MARQUE) {
      res.sendStatus(400);
      return;
   }
   dbacc.createBrand(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      res.send(data);
   })
});

module.exports = router;