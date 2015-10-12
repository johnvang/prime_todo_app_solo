var express = require('express');
var app = express();
var Todo = require("./models/todo");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
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


app.get('/getTodos', function(request, response, next){
    Todo.find({}, function(err, users){
        response.json(users);
    });
});

app.post('/todos', function(request, response, next){
    //console.log(request.body);
    Todo.create(request.body, function(err, post){
        response.send('ok');
    });
});

app.post('/deleteTodos', function(request, response){
    Todo.remove({_id:request.body._id}, function (err,resp) {
        if (err) {
            //return an error response
        } else {
            //return a success response
        }
    });
    response.sendStatus(200);
});

//update todo endpoint
app.post('/updateTodos', function(request, response){
    //Todo.findById(task._id, function(err, todo)
    console.log(request.body[1]);
    response.sendStatus(200);
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', 3000);
});


module.exports = app;
