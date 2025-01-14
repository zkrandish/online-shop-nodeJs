const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) =>{
MongoClient.connect('mongodb+srv://zkarandish:kGDlY2bBPkkh3BUR@cluster0.hskal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(client =>{
    console.log('connected');
    callback(client);
})
.catch(err=> {
    console.log(err)
    });
};

module.exports = mongoConnect;

