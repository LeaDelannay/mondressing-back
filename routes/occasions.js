var express = require('express');
var router = express.Router();

var dbacc = require('../dbaccess');

//READ ALL OCCASIONS NAME
router.get('/occasionname/', function (req, res, next) {
   console.log("----> call read all occasions name");
   dbacc.readOccasionsNames(function (err, data) {
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

 //READ ALL OCCASIONS
 router.get('/', function(req, res, next) {
   console.log("----> call read all occasions");
   dbacc.readOccasions(function(err, data){
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

//READ TOUS LES VETEMENTS POSSEDANT UNE OCCASION SPECIFIQUE
router.get('/:idOccas', function(req, res, next) {
   console.log("----> call read clothes with idOccas");
   dbacc.readSpecificOccas(req.params.idOccas, function(err, data){
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

//CREATE OCCASION
router.post('/', function (req, res, next) {
   console.log("req.body ----> " + req.body);
   if (!req.body.LIBEL_OCCAS) {
      res.sendStatus(400);
      return;
   }
   dbacc.createOccasion(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      res.send(data);
   })
});

module.exports = router;