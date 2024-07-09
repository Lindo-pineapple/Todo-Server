import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
const ObjectId = Schema.ObjectId;

const Schema_Todo = new Schema({
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
    },
    userId: {
        required: true,
        type: ObjectId
    }
})

export default model('Data', Schema_Todo, 'todos')