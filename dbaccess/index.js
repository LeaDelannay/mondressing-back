// CONNEXION A LA BASE DE DONNEES
// importation du module mysql
var mysql = require('mysql');
console.log('Get connection ...');

var connection = mysql.createConnection({
   database: 'dressing',
   host: "localhost",
   user: "root",
   password: ""
});


//DEBUT BRANDS/MARQUES\\
//LISTE DE TOUTES LES MARQUES EN BASE DE DONNEES - ALL
module.exports.readBrands = function (fct) {
   connection.query('SELECT * FROM marque ORDER BY NOM_MARQUE ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES NOMS DE MARQUES EN BASE DE DONNEES - ALL
module.exports.readBrandsNames = function (fct) {
   connection.query('SELECT NOM_MARQUE FROM marque ORDER BY NOM_MARQUE ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}


//LISTE DE TOUS LES VETEMENTS POSSEDANT UNE MARQUE SPECIFIQUE
module.exports.readSpecificBrand = function (idBrand, fct) {
   var sql = "SELECT * FROM vetement inner join marque on vetement.FK_ID_MARQUE = marque.ID_MARQUE WHERE marque.ID_MARQUE = ? ORDER BY NOM_VET ASC";
   var inserts = [idBrand];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}
//CREATION D'UNE MARQUE EN BASE DE DONNEES
module.exports.createBrand = function (obj, fct) {

   var sql = "INSERT INTO marque (NOM_MARQUE) VALUES(?)";
   var inserts = [obj.NOM_MARQUE];

   // création du vêtement en base de données
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      fct(null, results);
   });
}
//FIN BRANDS/MARQUES\\

//DEBUT CATEGORIES\\
//LISTE DE TOUTES LES CATEGORIES EN BASE DE DONNEES - ALL
module.exports.readCategories = function (fct) {
   connection.query('SELECT * FROM categorie ORDER BY LIBEL_CAT ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES NOMS DE CATEGORIES EN BASE DE DONNEES - ALL
module.exports.readCategoriesNames = function (fct) {
   connection.query('SELECT LIBEL_CAT FROM categorie ORDER BY LIBEL_CAT ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES VETEMENTS POSSEDANT UNE CATEGORIE SPECIFIQUE
module.exports.readSpecificCategory = function (idCategory, fct) {
   var sql = "SELECT * FROM vetement inner join categorie on vetement.FK_ID_CAT = categorie.ID_CAT WHERE categorie.ID_CAT = ? ORDER BY NOM_VET ASC";
   var inserts = [idCategory];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//CREATION D'UNE CATEGORIE EN BASE DE DONNEES
module.exports.createCategory = function (obj, fct) {

   var sql = "INSERT INTO categorie (LIBEL_CAT) VALUES(?)";
   var inserts = [obj.LIBEL_CAT];

   // création du vêtement en base de données
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      fct(null, results);
   });
}
//FIN CATEGORIES\\

//DEBUT CLOTHES\\
//LISTE DE TOUS LES VETEMENTS EN BASE DE DONNEES - ALL
module.exports.readClothes = function (fct) {
   connection.query('SELECT * FROM vetement ORDER BY NOM_VET ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES NOMS DE VETEMENTS EN BASE DE DONNEES - ALL
module.exports.readClothesNames = function (fct) {
   connection.query('SELECT NOM_VET FROM vetement ORDER BY NOM_VET ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//RECUPERE UN VETEMENT EN BASE DE DONNEES - UNITAIRE
module.exports.readSpecificClothe = function (idClothe, fct) {
   var sql = 'SELECT vetement.NOM_VET, vetement.ID_VET, vetement.DESCRIPT_VET, vetement.IMG_VET, categorie.LIBEL_CAT, vetement.FK_ID_CAT, note.NUM_NOTE, vetement.FK_ID_NOTE, marque.NOM_MARQUE, vetement.FK_ID_MARQUE, GROUP_CONCAT(DISTINCT(couleur.LIBEL_COUL) SEPARATOR ", ") as couleurs, GROUP_CONCAT(DISTINCT(couleur.ID_COUL) SEPARATOR ", ") as idCouleurs, GROUP_CONCAT(DISTINCT(caracteristique.LIBEL_CARACT) SEPARATOR ", ") as caracteristiques, GROUP_CONCAT(DISTINCT(caracteristique.ID_CARACT) SEPARATOR ", ") as idCaracteristiques, GROUP_CONCAT(DISTINCT(occasion.LIBEL_OCCAS) SEPARATOR ", ") as occasions, GROUP_CONCAT(DISTINCT(occasion.ID_OCCAS) SEPARATOR ", ") as idOccasions FROM vetement inner join categorie on vetement.FK_ID_CAT = categorie.ID_CAT inner join vet_coul_assoc on vetement.id_vet = vet_coul_assoc.id_vet inner join couleur on couleur.ID_COUL = vet_coul_assoc.ID_COUL inner join marque on vetement.FK_ID_MARQUE = marque.ID_MARQUE inner join vet_caract_assoc on vetement.id_vet = vet_caract_assoc.id_vet inner join caracteristique on caracteristique.ID_CARACT = vet_caract_assoc.ID_CARACT inner join vet_occas_assoc on vetement.id_vet = vet_occas_assoc.id_vet inner join occasion on occasion.ID_OCCAS = vet_occas_assoc.ID_OCCAS inner join note on vetement.FK_ID_NOTE = note.ID_NOTE WHERE vetement.ID_VET = ? ';
   var insert = [idClothe];
   connection.query(mysql.format(sql, insert), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//CREATION D'UN VETEMENT EN BASE DE DONNEES
module.exports.createClothe = function (obj, fct) {
   var idVet;

   var sql1 = "INSERT INTO vetement (FK_ID_CAT, FK_ID_MARQUE, FK_ID_NOTE, FK_ID_USER, NOM_VET, IMG_VET, DESCRIPT_VET) VALUES(?, ?, ?, ?, ?, ?, ?)";
   var inserts1 = [obj.FK_ID_CAT, obj.FK_ID_MARQUE, obj.FK_ID_NOTE, obj.FK_ID_USER, obj.NOM_VET, obj.IMG_VET, obj.DESCRIPT_VET];
   // création du vêtement en base de données
   connection.query(mysql.format(sql1, inserts1), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      //récupération de l'id du vêtement créé
      idVet = results.insertId;
      //création des associations
      var featureArray = obj.ID_CARACT;
      featureArray.forEach(function (item) {
         var sql2 = "INSERT INTO vet_caract_assoc (ID_VET, ID_CARACT) VALUES(" + idVet + ", ?)";
         var inserts2 = [item];
         console.log("CARACTERISTIQUE" + inserts2);
         connection.query(mysql.format(sql2, inserts2), (err) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
         })
      });
      var colorArray = obj.ID_COUL;
      colorArray.forEach(function (item) {
         var sql3 = "INSERT INTO vet_coul_assoc (ID_VET, ID_COUL) VALUES(" + idVet + ", ?)";
         var inserts3 = [item];
         console.log("COULEUR" + inserts3);
         connection.query(mysql.format(sql3, inserts3), (err) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
         })
      });
      var occasArray = obj.ID_OCCAS;
      occasArray.forEach(function (item) {
         var sql4 = "INSERT INTO vet_occas_assoc (ID_VET, ID_OCCAS) VALUES(" + idVet + ", ?)";
         var inserts4 = [item];
         console.log("OCCASION" + inserts4);
         connection.query(mysql.format(sql4, inserts4), (err) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
         })
      });
      fct(null, results);
   });
}

//SUPPRESSION D'UN VETEMENT EN BASE DE DONNEES
// d'abord, supression des tables associatives : vet coul assoc
module.exports.deleteClothe = function (idClothe, fct) {
   var sql1 = "DELETE FROM vet_coul_assoc WHERE vet_coul_assoc.ID_VET = ?";
   var insert1 = [idClothe];
   connection.query(mysql.format(sql1, insert1), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      console.log("Nb de couleurs supprimées : " + results.affectedRows);

      //si ça s'est bien passé, supprimer la table associative : vet caract assoc
      var sql2 = "DELETE FROM vet_caract_assoc WHERE vet_caract_assoc.ID_VET = ?";
      var insert2 = [idClothe];
      connection.query(mysql.format(sql2, insert2), (err, results) => {
         if (err) {
            console.error(err);
            fct(err, null);
            return;
         }
         console.log("Nb de caractéristiques supprimées : " + results.affectedRows);

         //si ça s'est bien passé, supprimer la table associative : vet occas assoc
         var sql3 = "DELETE FROM vet_occas_assoc WHERE vet_occas_assoc.ID_VET = ?";
         var insert3 = [idClothe];
         connection.query(mysql.format(sql3, insert3), (err, results) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
            console.log("Nb d'occasions supprimées : " + results.affectedRows);

            //si ça s'est bien passé, supprimer le vetement concerné
            var sql4 = "DELETE FROM vetement WHERE vetement.ID_VET = ?";
            var insert4 = [idClothe];
            connection.query(mysql.format(sql4, insert4), (err, results) => {
               if (err) {
                  console.error(err);
                  fct(err, null);
                  return;
               }

               console.log("Vetement supprimé OK " + results.affectedRows);
               fct(null, results.affectedRows);
            });
         });
      });
   });
}

//MODIFICATION D'UN VETEMENT EN BASE DE DONNEES
//d'abord, modification du vêtement concerné
module.exports.updateClothe = function (obj, fct) {
   var sql1 = "UPDATE vetement SET FK_ID_CAT = ?, FK_ID_MARQUE = ?, FK_ID_NOTE = ?, NOM_VET = ?, IMG_VET = ?, DESCRIPT_VET = ? WHERE vetement.ID_VET = ?";
   var insert1 = [obj.FK_ID_CAT, obj.FK_ID_MARQUE, obj.FK_ID_NOTE, obj.NOM_VET, obj.IMG_VET, obj.DESCRIPT_VET, obj.ID_VET];
   connection.query(mysql.format(sql1, insert1), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      console.log("Nb de lignes affectées pour la modification du vêtement : " + results.affectedRows);
      var idVet = obj.ID_VET;

      //si ça s'est bien passé, supprimer puis recréer les éléments dans les tables associatives
      //dans la table associative : vet caract assoc
      //suppression
      var sql2 = "DELETE FROM vet_caract_assoc WHERE vet_caract_assoc.ID_VET = ?";
      var insert2 = [idVet];
      connection.query(mysql.format(sql2, insert2), (err, results) => {
         if (err) {
            console.error(err);
            fct(err, null);
            return;
         }
         console.log("Nb de caractéristiques supprimées : " + results.affectedRows);
      });
      //ajout
      var featureArray = obj.idCaracteristiques.split(",");
      featureArray.forEach(function (item) {
         var sql3 = "INSERT INTO vet_caract_assoc (ID_VET, ID_CARACT) VALUES(" + idVet + ", ?)";
         var inserts3 = [item];
         console.log("CARACTERISTIQUE =>" + inserts3);
         connection.query(mysql.format(sql3, inserts3), (err) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
         })
      });
      //dans la table associative : vet occas assoc
      //suppression
      var sql4 = "DELETE FROM vet_occas_assoc WHERE vet_occas_assoc.ID_VET = ?";
      var insert4 = [idVet];
      connection.query(mysql.format(sql4, insert4), (err, results) => {
         if (err) {
            console.error(err);
            fct(err, null);
            return;
         }
         console.log("Nb d'occasions supprimées : " + results.affectedRows);
      });
      //ajout
      var occasionsArray = obj.idOccasions.split(",");
      occasionsArray.forEach(function (item) {
         var sql5 = "INSERT INTO vet_occas_assoc (ID_VET, ID_OCCAS) VALUES(" + idVet + ", ?)";
         var inserts5 = [item];
         console.log("OCCASION =>" + inserts5);
         connection.query(mysql.format(sql5, inserts5), (err) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
         })
      });

      //dans la table associative : vet coul assoc
      //suppression
      var sql6 = "DELETE FROM vet_coul_assoc WHERE vet_coul_assoc.ID_VET = ?";
      var insert6 = [idVet];
      connection.query(mysql.format(sql6, insert6), (err, results) => {
         if (err) {
            console.error(err);
            fct(err, null);
            return;
         }
         console.log("Nb de couleurs supprimées : " + results.affectedRows);
      });
      //ajout
      var colorArray = obj.idCouleurs.split(",");
      colorArray.forEach(function (item) {
         var sql7 = "INSERT INTO vet_coul_assoc (ID_VET, ID_COUL) VALUES(" + idVet + ", ?)";
         var inserts7 = [item];
         console.log("COULEUR =>" + inserts7);
         connection.query(mysql.format(sql7, inserts7), (err) => {
            if (err) {
               console.error(err);
               fct(err, null);
               return;
            }
         })
      });
      fct(null, results.affectedRows);
   });
}
//FIN CLOTHES\\

//DEBUT COLORS/COULEURS\\
//LISTE DE TOUTES LES COULEURS EN BASE DE DONNEES - ALL
module.exports.readColors = function (fct) {
   connection.query('SELECT * FROM couleur ORDER BY LIBEL_COUL ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES NOMS DE COULEURS EN BASE DE DONNEES - ALL
module.exports.readColorsNames = function (fct) {
   connection.query('SELECT LIBEL_COUL FROM couleur ORDER BY LIBEL_COUL ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES VETEMENTS POSSEDANT UNE COULEUR SPECIFIQUE
module.exports.readSpecificColor = function (idColor, fct) {
   var sql = "SELECT * FROM vetement inner join vet_coul_assoc on vetement.id_vet = vet_coul_assoc.id_vet inner join couleur on couleur.ID_COUL = vet_coul_assoc.ID_COUL WHERE couleur.ID_COUL = ? ORDER BY NOM_VET ASC";
   var inserts = [idColor];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//CREATION D'UNE COULEUR EN BASE DE DONNEES
module.exports.createColor = function (obj, fct) {

   var sql = "INSERT INTO couleur (LIBEL_COUL) VALUES(?)";
   var inserts = [obj.LIBEL_COUL];

   // création du vêtement en base de données
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      fct(null, results);
   });
}
//FIN COLORS/COULEURS\\

//DEBUT FEATURES/CARACTERISTIQUES\\
//LISTE DE TOUTES LES CARACTERISTIQUES EN BASE DE DONNEES - ALL
module.exports.readFeatures = function (fct) {
   connection.query('SELECT * FROM caracteristique ORDER BY LIBEL_CARACT ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES NOMS DE CATEGORIES EN BASE DE DONNEES - ALL
module.exports.readFeaturesNames = function (fct) {
   connection.query('SELECT LIBEL_CARACT FROM caracteristique ORDER BY LIBEL_CARACT ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES VETEMENTS POSSEDANT UNE CARACTERISTIQUE SPECIFIQUE
module.exports.readSpecificFeature = function (idFeature, fct) {
   var sql = "SELECT * FROM vetement inner join vet_caract_assoc on vetement.id_vet = vet_caract_assoc.id_vet inner join caracteristique on caracteristique.ID_CARACT = vet_caract_assoc.ID_CARACT WHERE caracteristique.ID_CARACT = ? ORDER BY NOM_VET ASC";
   var inserts = [idFeature];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//CREATION D'UNE CARACTERISTIQUE EN BASE DE DONNEES
module.exports.createFeature = function (obj, fct) {

   var sql = "INSERT INTO caracteristique (LIBEL_CARACT) VALUES(?)";
   var inserts = [obj.LIBEL_CARACT];

   // création du vêtement en base de données
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      fct(null, results);
   });
}
//FIN FEATURES/CARACTERISTIQUES\\

//DEBUT NOTES\\
//LISTE DE TOUTES LES NOTES EN BASE DE DONNEES - ALL
module.exports.readNotes = function (fct) {
   connection.query('SELECT * FROM note ORDER BY NUM_NOTE ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES VETEMENTS POSSEDANT UNE NOTE SPECIFIQUE
module.exports.readSpecificNote = function (idNote, fct) {
   var sql = "SELECT * FROM vetement inner join note on vetement.FK_ID_NOTE = note.id_note WHERE note.id_note = ? ORDER BY NOM_VET ASC";
   var inserts = [idNote];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}
//FIN NOTES\\

//DEBUT OCCASIONS\\
//LISTE DE TOUTES LES OCCASIONS EN BASE DE DONNEES - ALL
module.exports.readOccasions = function (fct) {
   connection.query('SELECT * FROM occasion ORDER BY LIBEL_OCCAS ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES NOMS D'OCCASIONS EN BASE DE DONNEES - ALL
module.exports.readOccasionsNames = function (fct) {
   connection.query('SELECT LIBEL_OCCAS FROM occasion ORDER BY LIBEL_OCCAS ASC', (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//LISTE DE TOUS LES VETEMENTS POSSEDANT UNE OCCASION SPECIFIQUE
module.exports.readSpecificOccas = function (idOccas, fct) {
   var sql = "SELECT * FROM vetement inner join vet_occas_assoc on vetement.id_vet = vet_occas_assoc.id_vet inner join occasion on occasion.ID_OCCAS = vet_occas_assoc.ID_OCCAS WHERE occasion.ID_OCCAS = ? ORDER BY NOM_VET ASC";
   var inserts = [idOccas];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }
      fct(null, results);
      console.log(results);
   });
}

//CREATION D'UNE OCCASION EN BASE DE DONNEES
module.exports.createOccasion = function (obj, fct) {

   var sql = "INSERT INTO occasion (LIBEL_OCCAS) VALUES(?)";
   var inserts = [obj.LIBEL_OCCAS];

   // création du vêtement en base de données
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      fct(null, results);
   });
}
//FIN OCCASIONS\\


//DEBUT USER\\
//CREATION D'UN USER EN BASE DE DONNEES
module.exports.createUser = function (obj, fct) {

   var sql = "INSERT INTO user (PSEUDO_USER, LOGIN_USER, MDP_USER) VALUES(?, ?, SHA2(?, 256))";
   var inserts = [obj.PSEUDO_USER, obj.LOGIN_USER, obj.MDP_USER];

   // création du vêtement en base de données
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         return;
      }
      fct(null, results);
   });
}

//COMPARAISON USER MDP
module.exports.readUser = function (obj, fct) {
   var mdpFromBdd = '';
   var idFromBdd = '';
   var mdpFromClt = '';

   var sql = "SELECT LOGIN_USER FROM user WHERE LOGIN_USER = ?";
   var inserts = [obj.LOGIN_USER];
   connection.query(mysql.format(sql, inserts), (err, results) => {
      if (err) {
         console.error(err);
         fct(err, null);
         connection.end();
         return;
      }

      var sql2 = "SELECT ID_USER, MDP_USER FROM user WHERE LOGIN_USER = ?";
      var inserts2 = [obj.LOGIN_USER];
      connection.query(mysql.format(sql2, inserts2), (err, results) => {
         if (err) {
            console.error(err);
            fct(err, null);
            connection.end();
            return;
         }
         // fct(null, results);
         results.forEach(element => {
            mdpFromBdd = element.MDP_USER;
            idFromBdd = element.ID_USER;
         });

         var sql3 = "SELECT SHA2(?, 256) as mdp FROM DUAL ";
         var inserts3 = [obj.MDP_USER];
         connection.query(mysql.format(sql3, inserts3), (err, results) => {
            if (err) {
               console.error(err);
               fct(err, null);
               connection.end();
               return;
            }
            results.forEach(element => {
               mdpFromClt = element.mdp;
            });
            
            if (mdpFromClt === mdpFromBdd) {
               console.log(idFromBdd);
               fct(null, idFromBdd);
            } else {
               fct(null, '');
               console.log(results);
            }
         });
      });
   });
}
//FIN USER\\