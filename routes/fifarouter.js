const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/getTeams',(req,res)=>{
    controller.fifaController.teams()
        .then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(500).json(err);
        })
})

router.get('/getRounds',(req,res)=>{
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



module.exports = router;