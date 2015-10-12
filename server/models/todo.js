var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var todoSchema = mongoose.Schema({
    completed: Boolean,
    description: String,
    when: String
});

module.exports = mongoose.model('Todo', todoSchema);