const express = require('express');
const router = express.Router();
const controller = require('../controllers');


/*
* Desde postman, puedo ver que los métodos si devuelven
* un objeto con lo tomado desde el API
*/
router.get('/getTeams',(req,res)=>{
    controller.fifaController.teams()
        .then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(500).json(err);
        })
})

router.get('/getMatches',(req,res)=>{
    controller.fifaController.matchdays()
        .then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(500).json(err);
        })
})

router.get('/getScorers',(req,res)=>{
    controller.fifaController.goals()
        .then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(500).json(err);
        })
})

router.get('/loadSave',(req,res)=>{
    controller.fifaController.loadSave()
        .then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(500).json(err);
        })
})


/*
* Interacción con la base de datos, peticiones 
* para la vista
*/




module.exports = router;