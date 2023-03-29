const express = require('express');
const path = require('path');
const static = express.static('public');
const cors = require('cors');
const bodyParser = require('body-parser');
const cartRouter = require('./api/cart');
const session = require('express-session');

const { connectToDb, getDB } = require('./db/database');
const { ObjectId } = require('mongodb');

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
  const db = getDB();
  const collection = db.collection('products');
  collection.find().toArray().then(products => {
      res.send(products);
  }).catch(err => {
    console.log(err);
  })

  console.log('done!');
});

app.post('/updateproduct', (req, res) => {
  const db = getDB();
  const collection = db.collection('products');
  const id = req.body._id;
  const item = req.body.data;
  collection.updateOne({_id: new ObjectId(id)},{
    $set : {
      ...item
    }
  }).then(data => {
    res.send(data);
  })

});

app.post('/addproduct', (req,res) => {
    const db = getDB();
    const collection = db.collection('products');
    const newProduct = req.body;
    //check data! {name, price, description}

    collection.insertOne(newProduct).then(data => {
      console.log(data);
      console.log('done');
      res.send(data);
    });
})

app.use('/', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'files', '404.html'));
})


connectToDb(()=> {
  app.listen(999);
});