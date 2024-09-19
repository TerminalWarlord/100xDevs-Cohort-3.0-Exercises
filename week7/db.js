const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

})

const todoSchema = new Schema({
    userId: { type: ObjectId, required: true },
    title: { type: String, required: true },
    done: { type: Boolean },

})
const User = mongoose.model('user', userSchema);
const Todo = mongoose.model('todo', todoSchema);
module.exports = {
    User,
    Todo,
}