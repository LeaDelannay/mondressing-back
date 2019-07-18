var express = require('express');
var path = require('path');
var router = express.Router();

var dbacc = require('../dbaccess');

var rootPath = __dirname; //sert pour l'upload  d'images

router.post('/', function (req, res) {
   if (Object.keys(req.files).length == 0) { //vérifie si je n'ai pas envoyé un fichier ?
      return res.status(400).send("Pas de fichier envoyé"); //alors erreur
   }
   let sampleFile = req.files.file; //fichier file qui est dans un objet files dans mon req
   let pth = path.join(rootPath, '..', 'down', sampleFile.name); //down = nom du dossier contenant toutes les images. Rootpath = le local. .. = répertoire parent. Samplefile.name = nom de mon fichier
   sampleFile.mv(pth, function(err){ //mv est une méthode d'upload
      if(err){
         console.log(err);
         return res.status(500).send(err);
      }
      res.send('file uploaded'); //ok 
   }); 
});

router.get('/:filename', function(req, res){ //récupérer nom du file dans un input front et l'envoyer au back
   let pth = path.join(rootPath, '..', 'down', req.params.filename); // correspond au filename ligne au dessus /:filename
   res.download(pth);
});

module.exports = router;