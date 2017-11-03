const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const message = 'Test to hash';
const hash = SHA256(message).toString();

const data = {
    id: 4
};

const token = jwt.sign(data, 'secret');

console.log(token);

const decoded = jwt.verify(token, 'secret');

console.log(JSON.stringify(decoded));
