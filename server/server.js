var app  	   = require('express')();
var http	   = require('http').Server(app);


app.get('/', function(req, res) {

	res.sendFile(__dirname + '/main.html');

});

// kitset_client_api
// kitset_gateway
// kitset_superlogical
// kitset_server_api
// kitset_db_mysql
// kitset_db_mongo

// app.




http.listen(5000, function(){
  console.log('listening on *:5000');
});