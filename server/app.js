var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html')
});

app.post('/',function(req, res){
    req.post("change made...")
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', 3000);
});

module.exports = app;
