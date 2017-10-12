const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process_params.env.PORT || 3000;

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    const text = req.body.text;
    const todo = new Todo({text});
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
       res.send({todos})
   }).catch((err) => {
       res.status(400).send(err);
   });
});

app.get('/todos/:id', (req, res) => {
   const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
   Todo.findById(id).then((todo) => {
       if(!todo){
           return res.status(400).send();
       }
       res.send({todo})
   }).catch((e) => {
        return res.status(404).send();
   });
});

app.listen(port, () => {
    console.log(`App is started at port ${port}`);
});

module.exports = {app};