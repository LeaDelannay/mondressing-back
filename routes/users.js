var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

var dbacc = require('../dbaccess');
// cette clé ne doit pas être en dur dans le code mais doit appeler une variable d'environnement
//Pour besoins de dev, mise en dur (possibilité d'oubli de la conf, et en plus sinon il faut recréer la variable d'environnement à chaque fois que je change de poste)
var secretKeyForJwt = 'secretKeyForJwtYop';

//READ USER
router.post('/login/', function (req, res, next) {
   console.log("----> call read user");
   if (!req.body.LOGIN_USER || !req.body.MDP_USER) {
      res.sendStatus(400);
      return;
   }
   dbacc.readUser(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
         return;
      }
      console.log(data);
      if (data == 0 || data == null || data == undefined || data == "") {
         res.sendStatus(403); //forbidden
         return;
      }
      //JWT
      //déclare la charge utile = le corps de la requete
      let payload = {
         login: req.body.LOGIN_USER
      };
      //Encode la charge utile avec la secret key
      let token = jwt.encode(payload, secretKeyForJwt);
      console.log(token);
      res.status(200).send({
         token: token
      }); //renvoie 200 ok + token
   });
});

//CREATE USER
router.post('/', function (req, res, next) {
   console.log("req.body ----> " + req.body);
   var contenuRecuReq = JSON.stringify(req.body);
   console.log("req.body json.stringify ----> " + contenuRecuReq);
   if (!req.body.LOGIN_USER || !req.body.MDP_USER) {
      res.sendStatus(400);
   }
   dbacc.createUser(req.body, function (err, data) {
      if (err) {
         res.sendStatus(500);
      }
      res.send(data);
   })
});

module.exports = router;