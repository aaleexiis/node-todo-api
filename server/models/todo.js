const {mongoose} = require('mongoose');

const Schema = mongoose.Schema;
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

model.exports = {Todo};