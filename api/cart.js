const express = require('express');

const router = express.Router();


router.use('/cart', (req, res, next) => {
    if(!req.session.cart) {
        req.session.cart = [];
    }
    next();
})

router.get('/cart',(req, res) => {
    res.json(req.session.cart);
});

router.post('/cart', (req, res) => {
    const { id } = req.body;
    if(id) {
        const index = global.products.findIndex(obj => {
            return obj.id === id;
        });
        if(index !== -1) {
            req.session.cart.push({
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