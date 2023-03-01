const express = require('express');
const bodyParser = require('body-parser');

//cors missing

const products = [
      {
        "name" : "Black Coffee",
        "price" : 22,
        "description": "A very important drink for programmers"
      },
      {
        "name" : "Black Coffee 2",
        "price" : 22,
        "description": "A very important drink for programmers"
      },
      {
        "name" : "Black Coffee 3",
        "price" : 22,
        "description": "A very important drink for programmers"
      }
];


const app = express();

app.use(bodyParser.json());

app.get('/api/products', (req,res, next) => {
    res.json(products);
})

app.post('/api/additem', (req, res, next) => {
    itemToAdd = req.body;
    //test if actual product!
    products.push(itemToAdd);
    res.json("success");
});

app.use('/',(req, res) => {
    res.send('<html><body>hello world</body></html>');
});

app.listen(999);