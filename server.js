const express = require('express');
const path = require('path');
const static = express.static('public');
const cors = require('cors');
const bodyParser = require('body-parser');

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
  ]


let views = 0;


const app = express();

app.use(cors());

app.use(static);

app.use(bodyParser.json());


app.use('/', (req, res, next) => {
    // console.log('views:' + ++views);
    console.log(req.url);
    next();
    // console.log('after next');
});

app.use('/home', (req,res,next) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'files', 'index.html'));
});

app.use('/redirect',(req, res) => {
    res.redirect('https://www.nodejs.com');
    // res.send('<html><body>hello world</body></html>');
});

app.use('/products', (req, res) => {
    res.json(products);
});

app.use('/addproduct', (req,res) => {
    products.push(req.body);
    res.send('done');
})

app.use('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'files', '404.html'));
})


app.listen(999); 