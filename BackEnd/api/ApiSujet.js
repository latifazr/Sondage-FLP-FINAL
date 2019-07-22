var router = require('express').Router();
var Sujet = require('../models/sujet');




router.post('/addSujet', async function(req, res) {
    var Sujet = new Sujet(req.body);
    await Sujet.save(function(err, sujet) {
      if (err) {
        res.send(err);
      }
      res.send(sujet);
    })
  })

  router.post('/DeleteSujet/:sujetId', async function(req, res){
    await Sujet.findByIdAndRemove({_id: req.params.sujetId}, function(err, sujet){
      if (err) {
        res.send(err);
      }
      res.send(sujet);
    })
  }) 


  router.get('/allSujet', function (req, res) {
    Sujet.find().exec((err, sujets) => {
        if (err) {
            console.log(err);
        }
        res.send(sujets);
    })
});

router.get('/mySujet/:id', async function(req, res){
  var id = req.params.id;
  
  await Sujet.find({user:id}).populate('users').exec(function(err, sujets){
    if(err){
      res.send(err);
    }
    res.send(sujets);
  })
})


router.post('/voteSujet/:sujetId/:userId', async function(req, res) {
  await Sujet.findById(req.params.sujettId, function(err, sujet) {
    if (err) {
      res.send(err);
    }
    var like = sujet.choix;
    if (sujet.user_choix.length == 0) {
      Sujet.findByIdAndUpdate({_id: req.params.sujetId}, {$push: {user_choix: req.params.userId}, choix: oui}, function(errrrr, dlt) {
        if (errrrr) {
          console.log(errrrr);
        }
      })
    }
    for (let user of sujet.user_choix) {
      if (user == req.params.userId) {
        choix = non;
        Sujet.findByIdAndUpdate({_id: req.params.sujetId}, {$pull: {user_choix: req.params.userId}, choix: like}, function(errr, upd) {
          if (errr) {
            console.log(errr);
          }
        })
      } else {
        choix = oui;
        Sujet.findByIdAndUpdate({_id: req.params.projectId}, {$push: {user_choix: req.params.userId}, choix: like}, function(errrr, dlt) {
          if (errrr) {
            console.log(errrr);
          }
        })
      }
    }
    res.send(sujet);
  })
})
  

module.exports = router;