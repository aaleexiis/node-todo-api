const {MongoClinet, ObjectID} = require('mongodb');

MongoClinet.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) return console.log("Unable to connect to MongoDB server.")
    console.log('Connected to MongoDB server.');

   /* db.collection('Todos').insertOne({
        text: 'Clean my room',
        completed: false
    }, (err, result) => {
        if (err) return console.log('Unable to add new todo', err);
        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

    db.collection('Users').insertOne({
        name: 'Iskra Nenadovic',
        age: 1,
        location: 'Karla Metikosa 3, Zagreb'
    }, (err, result) => {
        if (err) return console.log('Unable to add new user', err);
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});