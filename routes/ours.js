var express = require('express');
var router = express.Router();

/*
 * (1) - Configuration de la connexion vers la base de données
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/OursDb');//'mongodb://localhost/oursdb'


/*
 * (2) - shema
 */
//var Schema = mongoose.Schema;
var BearSchema = mongoose.Schema({
    nom: String,
    age : Number
}, {collection : 'ours'});

var Ours = mongoose.model('ours', BearSchema);



/* GET home page. */
router.get('/', function(req, res, next) {
    Ours.find(function(err, data){
        if(err){
            res.send(err);
        }
        res.send(data);
    });
});

/* GET BY ID home page. */
router.get('/:id', function(req, res) {
    Ours.findOne({_id: req.params.id}, function(err, data){
        if(err){
            res.send(err);
        }
        res.send(data);
    });
});

/* UPDATE BY ID home page. */
router.put('/:id', function(req, res) {
    Ours.findOne({_id: req.params.id}, function(err, data){
        //donner nouveau donnees
        data.nom = req.body.nom//from form
        data.age = req.body.age;//from form
        data.save(function(err){
            if(err){
                res.send(err);
            }
            res.send({message:'ours updated'});
        })

    });
});

/* DELETE. */
router.delete('/:id', function(req, res) {
    //res.render('index', { title: 'Express' });
    Ours.remove({_id: req.params.id}, function(err){
        if(err){
            res.send(err);
        }
        res.send({message:'ours deleted'});
    });
});

//post
router.post('/', function(req, res) {
    //cree instance du model
    var ours = new Ours();
    ours.nom = req.body.nom;//from form
    ours.age = req.body.age;//from form
    ours.save(function(err){
        if(err){
            res.send(err);
        }
        res.send({message:'ours created'});
    });
});

module.exports = router;