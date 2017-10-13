const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const todoID = '59df240973b62d6fccc4ce7e';
const userID = '59de115d394152247eee4375';

if(ObjectID.isValid(todoID)){
    console.log('todoID not Valid')
}

if(ObjectID.isValid(userID)){
    console.log('userID is not valid');
}

Todo.findByIdAndRemove(todoID).then((todo) => {
    console.log(todo);
});