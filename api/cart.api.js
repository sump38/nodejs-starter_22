const express = require('express');

const cart = [];


const router = express.Router();

router.get('/cart', (req, res) => {
    console.log(req.sessionID);
    if(req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.json(req.session.views);
});

router.post('/cart', (req, res, next) => {
    const { id } = req.body;
    if(id) {
        cart.push({ id: id});
        res.json("success");
    }
    else {
        next('no id specified');
    }
});

router.delete('/cart', (req, res, next) => {
    const { id } = req.body; 
    if(id) {
        id = cart.findIndex(item => {
            item.id === id;
        });
        if(id!==-1) {
            cart.splice(id, 1);
        } else {
            res.status(400).json(`item doesn't exist in cart`);
        }
    } else {
        next('no id specified');
    }
});


module.exports = router;