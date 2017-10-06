const {MongoClient, ObjectID} = require('mongodb');
const todoCollection = 'Todos';
const usersCollection = 'Users';

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err) return console.log("Unable to connect to MongoDB server.")
    console.log('Connected to MongoDB server.');

    /*db.collection(todoCollection)
        .findOneAndUpdate({
            __id: new ObjectID('59d74990ee969831aa6b2a24')
        }, {
            $set: {
                completed: true
            }
        },{
            returnOriginal: false
        }).then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        }).catch((err) => {
            console.log(err);
        });*/
    //db.close();

    db.collection(usersCollection)
        .findOneAndUpdate(
            {__id: new ObjectID('59d4e71252b4f0ffed96a658')}, {
                $inc: {age: 1},
                $set:{name:'mama'}
            }, { returnOriginal:false }
        ).then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
        }). catch((err) => {
            console.log(err);
        });
});