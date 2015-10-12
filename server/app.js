var express = require('express');

var app = express();

//var Todo = require("./models/todo");

//////////  CONNECT TO DATABASE  //////////////////
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/todos";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open!');
});
///////////////////////////////////////////////////

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html')
});

app.post('/',function(req, res){
    req.post("change made...")
});

//create todo post endpoint
//
//{
//    completed: false,
//    description: "My todo",
//    date: //
//}
//app.post('/todos',function(req, res){
//    var todo = new Todo(...);
//    todo.save(function (err, todo) {
//        if (err) {
//            alert("YOU HAVE AN POST ERROR!")
//        } else {
//            console.log("post to db successful.")
//        }
//    });
//});
//
////list all todos
//app.get('/todos', function(req, res){
//    Todo.find(function (err, todos) {
//        if (err) {
//            //return an error response
//        } else {
//            //return a success response
//        }
//    });
//});
//
////update todos
//app.put('/todos/:id', function(req, res){
//    Todo.findByIdAndUpdate(req.params("id"), req.params, function (err, todo) {
//        if (err) {
//            //return an error response
//        } else {
//            //return a success response
//        }
//    });
//);
//
////delete todo
//app.delete('/todos/:id', function(req, res){
//    Todo.findByIdAndRemove(req.params("id"), function (err, todo) {
//        if (err) {
//            //return an error response
//        } else {
//            //return a success response
//        }
//    });
//});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', 3000);
});


module.exports = app;
