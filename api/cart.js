const express = require('express');

const router = express.Router();

global.cart = [];


router.get('/cart',(req, res) => {
    res.json(global.cart);
});

router.post('/cart', (req, res) => {
    const { id } = req.body;
    if(id) {
        const index = global.products.findIndex(obj => {
            return obj.id === id;
        });
        if(index !== -1) {
            global.cart.push({
                id: id
            });
            res.json('success');
        } else {
            res.status(500);
            res.json({
                error: `product with id: ${id} does not exist`
            })
        }
    }
    else {
        res.status(400).json(
            {
                error: `missing property: id`
            }
        )
    }
    
});

router.delete('/cart', (req, res) => {
    const { id } = req.body;
    if(id) {

    }
    res.json('success');
});

router.patch('/cart', (req, res) => {

})

module.exports = router;