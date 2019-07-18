var express = require('express');
var router = express.Router();

var dbacc = require('../dbaccess');

//READ ALL CATEGORIES NAME
router.get('/categoryname/', function (req, res, next) {
   console.log("----> call read all categories name");
   dbacc.readCategoriesNames(function (err, data) {
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

//READ TOUS LES VETEMENTS POSSEDANT UNE CATEGORIE SPECIFIQUE
router.get('/:idCategory', function (req, res, next) {
   console.log("----> call read clothes with idCategory");
   dbacc.readSpecificCategory(req.params.idCategory, function (err, data) {
      console.log(data);
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

//READ ALL CATEGORIES
router.get('/', function (req, res, next) {
   console.log("----> call read all categories");
   dbacc.readCategories(function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      if (data == 0 || data == null || data == undefined || data == "") {
         res.sendStatus(204);
         return;
      }
      res.send(data);
   })
});

//CREATE CATEGORIE
router.post('/', function (req, res, next) {
   console.log("req.body ----> " + req.body);
   if (!req.body.LIBEL_CAT) {
      res.sendStatus(400);
      return;
   }
   dbacc.createCategory(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      res.send(data);
   })
});

module.exports = router;