var app  	   = require('express')();
var http	   = require('http').Server(app);


app.get('/', function(req, res) {

	res.sendFile(__dirname + '/main.html');

});






http.listen(1234, function(){
  console.log('listening on *:1234');
});