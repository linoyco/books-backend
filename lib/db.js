const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://linoyco:203531397@cluster0.tivg9.mongodb.net/Cluster0?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected!');
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = mongoConnect;