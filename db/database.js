const { MongoClient, Db } = require('mongodb');
require('dotenv').config();


const uri = process.env.MONGOURI;
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

/**
 * 
 * @returns {Db}
 */
module.exports.getDB = () => {
    return db;
}

