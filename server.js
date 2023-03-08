const express = require('express');
const path = require('path');
const static = express.static('public');
const cors = require('cors');
const bodyParser = require('body-parser');
const cartRouter = require('./api/cart');
const session = require('express-session');

global.products = [
    {
      "name" : "Black Coffee",
      "price" : 22,
      "description": "A very important drink for programmers",
      "id": "000"
    },
    {
      "name" : "Black Coffee 2",
      "price" : 22,
      "description": "A very important drink for programmers",
      "id": "001"
    },
    {
      "name" : "Black Coffee 3",
      "price" : 22,
      "description": "A very important drink for programmers",
      "id": "002"
    }
  ]


let views = 0;


const app = express();

app.use(session({
  secret: 'aqR7911B3 ddfdd',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 60000
  }
}));

app.use(cors());

app.use(static);

app.use(bodyParser.json());

app.use('/api', cartRouter);

app.use('/', (req, res, next) => {
    if(req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    console.log(req.session.views);
    next();
    // console.log('after next');
});

app.use('/views', (req, res) => {
  res.json(req.session.views);
})

app.use('/home', (req,res,next) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'files', 'index.html'));
});

app.use('/redirect',(req, res) => {
    res.redirect('https://www.nodejs.com');
    // res.send('<html><body>hello world</body></html>');
});

app.use('/personalPage/favorites', (req, res) => {

});

app.use('/personalPage', (req, res) => {

});



app.get('/products', (req, res) => {
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