var express = require('express');
var router = express.Router();

var dbacc = require('../dbaccess');

 //READ ALL
 router.get('/', function(req, res, next) {
   console.log("----> call read all notes");
   dbacc.readNotes(function(err, data){
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

//READ TOUS LES VETEMENTS POSSEDANT UNE NOTE SPECIFIQUE
router.get('/:idNote', function(req, res, next) {
   console.log("----> call read clothes with idNote");
   dbacc.readSpecificNote(req.params.idNote, function(err, data){
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

module.exports = router;