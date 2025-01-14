const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
MongoClient.connect('mongodb+srv://zkarandish:kGDlY2bBPkkh3BUR@cluster0.hskal.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(client =>{
    console.log('connected');
    _db = client.db();
    callback();
})
.catch(err=> {
    console.log(err);
    throw err;
    });
};

const getDb = () =>{
    if (_db){
        return _db;
    }
    throw 'NO database found!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

