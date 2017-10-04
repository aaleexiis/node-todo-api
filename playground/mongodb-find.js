const {MongoClient, ObjectID} = require('mongodb');
const todoCollection = 'Todos';
const usersCollection = 'Users';

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) return console.log("Unable to connect to MongoDB server.")
    console.log('Connected to MongoDB server.');

  /*  db.collection(todoCollection).find().toArray().then((docs) => {
        console.log('Todos:');
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch((err) => {
        return console.log('Unable to fetch todos', err);
    });*/

    /*db.collection(todoCollection).find().count().then((count) => {
        console.log(`You have ${count} tasks in your database.`);
    }).catch((err) => {
        return console.log('Unable to fetch todos', err);
    });*/

    db.collection(usersCollection)
        .find({name: 'Iskra'})
        .toArray()
        .then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch((err) => {
            console.log(`Unable to fetch users - ${err}`);
        });

    //db.close();
});