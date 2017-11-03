require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        return res.status(404).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(400).send();
        }
        res.send({todo});
    }).catch((e) => {
        return res.status(404).send();
    });
});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])

    if(!(body.email && body.password)){
        return res.status(400).send('Email or password is not defined.');
    }

    const user = new User(body);
    user.save().then(() => {
        user.generateAuthToken();
    }).then((token) => {
        console.log(JSON.stringify(token,undefined,2));
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () => {
    console.log(`App is started at port ${port}`);
});

module.exports = {app};