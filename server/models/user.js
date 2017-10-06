const {mongoose} = require('mongoose');

const Schema = mongoose.Schema;
const User = mongoose.model('User', {
    email: {
        required: true,
        type: String,
        minlength: 1,
        trim: true
    }
});

model.exports = {User};