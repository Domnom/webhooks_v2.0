var app  	   = require('express')();
var http	   = require('http').Server(app);
var exec 	   = require('child_process').exec;

app.get('/', function(req, res) {

	res.sendFile(__dirname + '/main.html');

});

// kitset_client_api
// kitset_gateway
// kitset_superlogical
// kitset_server_api
// kitset_db_mysql
// kitset_db_mongo

app.get('/mysql/start', function(req, res) {
	exec('cd ~/gateway_nodejs && docker-compose start -d mysql && touch ~/docker-has-started.txt');
	res.send('Start mysql');
});

app.get('/mysql/stop', function(req, res) {
	exec('cd ~/gateway_nodejs && docker-compose stop mysql');
	res.send('Stop mysql');
});

app.get('/myql/restart', function(req, res) {
	exec('cd ~/gateway_nodejs && docker-compose restart mysql');
	res.send('Restart mysql');
});






http.listen(5000, function(){
  console.log('listening on *:5000');
});