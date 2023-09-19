const express = require('express');
const Model = require('../models/userModel');

const router = express.Router();

router.post('/add', (req, res) => {
    //json
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        
        setTimeout( () => { res.json(result); }, 3000);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});

//getall


router.get('/getall', (req, res) => {

    Model.find({})
    .then((result) => {
        res.json(result);
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});
// : denotes url parameter 
router.get('/getbyemail/:email', (req,res) => {
    console.log(req.params.email);
    
    //find func matches and return all the doc
    //findone func matches and return only first doc
    Model.findOne({email : req.params.email})
    .then((result) => {
        res.json(result);
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});

//getbyid
router.get('/getbyid/:id', (req, res) => {
   // Model.findOne({_id : req.params.id})
    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});

//delete
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json(result);
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});

//update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new : true}) 
    .then((result) => {
        res.json(result);
        
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});
router.post('/authenticate', (req, res) =>{
    console.log(req.body);
    Model.findOne(req.body)
    .then((result) => {
        console.log(result);
        if(result !== null) res.json(result);
        else res.status(401).json({message : 'login failed'})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});


module.exports = router;