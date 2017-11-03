const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user')

const todos = [ {
        _id: new ObjectID(),
        text: 'Test todo text'
    }, {
        _id: new ObjectID(),
        text: '2 test todo',
        completed: true,
        completedAt: 333
    }];

beforeEach((done) => {
   Todo.remove({}).then(() => {
       Todo.insertMany(todos);
   }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, resp) => {
                if (err){
                    return done(err);
                }

                Todo.find(text).then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });


    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, resp) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return 400 if todo not found', (done) => {
        const randomID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${randomID}`)
            .expect(400)
            .end(done);
    });


    it('should return 404 if object id is not valid', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            }).end((err, res) => {
                if(err) return done(err);

                Todo.findById(hexID).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((err) => done(err));
            });
    });

   it('should return 400 if todo not found', (done) => {
        const randomID = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${randomID}`)
            .expect(400)
            .end(done);
    });

    it('should return 404 if object id is not valid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        const hexID = todos[0]._id.toHexString();
        const changedTodo = {
            text: 'Test todo text - updated',
            completed: true
        };
        request(app)
            .patch(`/todos/${hexID}`)
            .send(changedTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
                expect(res.body.todo.text).toBe(changedTodo.text);
                expect(res.body.todo.completed).toBe(changedTodo.completed);
                expect(res.body.todo.completedAt).toBeA('number');
            }).end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        const hexID = todos[1]._id.toHexString();
        const changedTodo = {
            text: '2 test todo - updated',
            completed: false
        };

        request(app)
            .patch(`/todos/${hexID}`)
            .send(changedTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
                expect(res.body.todo.text).toBe(changedTodo.text);
                expect(res.body.todo.completed).toBe(changedTodo.completed);
                expect(res.body.todo.completedAt).toNotExist();
            }).end(done);
    });
});

describe('POST /users', () => {
    it('should create a new user', (done) => {
        const user = {
            email: 'pero@riba.com',
            password: 'peroriba'
        };

        request(app)
            .post('/users')
            .send(user)
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(user.email);
                expect(res.body.password).toBe(user.password);
            })
            .end((err, resp) => {
                if (err){
                    return done(err);
                }

                User.find(user).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].email).toBe(user.email);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create user if password is missing', (done) => {
        const user = {
            email: 'pero1@riba.com'
        };

        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end(done);
    });

    it('should not create user if email is missing', (done) => {
        const user = {
            password: 'peroriba1'
        };

        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end(done);
    });

});