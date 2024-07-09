const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    todo: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    isDone: {
        required: true,
        type: Boolean
    }
})

module.exports = mongoose.model('Data', dataSchema, 'todos')