const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dbuser:s8qxLNZe0XWApqn2@tea-shop-db.nskuwfk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let db;



module.exports.connectToDb = (callback) => {
    client.connect().then(c => {
        db = c.db('tea-shop-db');
        console.log('db connected');
        callback();
    }).catch(err => {
        console.log(err);
    });
}

module.exports.getDB = () => {
    return db;
}

