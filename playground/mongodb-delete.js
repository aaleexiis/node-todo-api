const {MongoClient, ObjectID} = require('mongodb');
const todoCollection = 'Todos';
const usersCollection = 'Users';

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err) return console.log("Unable to connect to MongoDB server.")
    console.log('Connected to MongoDB server.');

   /* db.collection(todoCollection)
        .deleteMany({
            text: 'Eat lunch'
        })
        .then((result) => {
            console.log(JSON.stringify(result));
        })
        .catch((err) => {
            console.log(err);
        });

    db.collection(todoCollection)
        .findOneAndDelete({
            text: 'Trolo',
            completed: false
        })
        .then((result) => {
            console.log(result, undefined, 2);
        });*/

   /*db.collection(usersCollection)
       .deleteMany({
           name : "aaa",
            age : 11,
            location : "xxx"
       })
       .then((result) => {
            console.log('deleteMany');
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });*/

    db.collection(usersCollection)
        .findOneAndDelete({
            __id : new ObjectID("59d4e73552b4f0ffed96a672")
        })
        .then((result) => {
            console.log('findOneAndDelete');
            console.log(JSON.stringify(result, undefined, 2));
        });
    //db.close();

});