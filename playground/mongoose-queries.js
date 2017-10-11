const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const todoID = '59de08c916d41d7d072cc4c8';
const userID = '59de115d394152247eee4375';

if(ObjectID.isValid(todoID)){
    console.log('todoID not Valid')
}

if(ObjectID.isValid(userID)){
    console.log('userID is not valid');
}

Todo.findOne({
    _id: todoID
}).then((todo) => {
    if(!todo) {
        return console.log('todo not found');
    }
    console.log(todo);
}).catch((e) => console.log(e));

User.findOne({
    _id: userID
}).then((user) => {
    if(!user){
        return console.log('user not found');
    }
    console.log(`User: ${JSON.stringify(user, undefined, 2)}`);
}).catch((e) => console.log(e));

User.findById(userID).then((user) => {
    if(!user){
        return console.log('user not found');
    }
    console.log(`User by id found: ${JSON.stringify(user, undefined, 2)}`);
}).catch((e) => console.log(e));