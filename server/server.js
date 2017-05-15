var app  	   = require('express')();
var http	   = require('http').Server(app);
var exec 	   = require('child_process').exec;
var DockerCompose = require("docker-compose-remote-api");
var cwd 	   = '../gateway_nodejs';
var docker = DockerCompose({cwd: '../gateway_nodejs'});
// var docker = DockerCompose({cwd: '../gateway_nodejs'}).DockerRemoteAPI({
//     host: '127.0.0.1',
//     port: 2375
// });

app.get('/', function(req, res) {

	res.sendFile(__dirname + '/main.html');

});

app.get('/containers', function(req, res) {

	docker.ps(function(containers) {
		res.status(200).send(containers);
	});

});

// kitset_client_api
// kitset_gateway
// kitset_superlogical
// kitset_server_api
// kitset_db_mysql
// kitset_db_mongo

app.get('/mysql/start', function(req, res) {

	var execDockerCompose  = exec("docker-compose up -d mysql", { cwd: cwd });
		execDockerCompose.on('exit', function() {
			res.status(200).send('hello there');
		});
	// exec('cd ~/gateway_nodejs && docker-compose start -d mysql; touch ~/docker-has-started.txt');
	// res.send('Start mysql');
	// docker.getContainerId("mysql", function(err, id){
	//     if(err) console.log(err);
	//     else{
	//         var container = docker.dockerode.getContainer(id);
	//         container.inspect(function (err, data) {
	//             console.log(data);
	//             res.status(200).send('myData', data);
	//         });
	//     }
	// });

});

app.get('/mysql/stop', function(req, res) {
	
	var execDockerCompose = exec("docker-compose stop mysql", { cwd: cwd });
		

});

app.get('/myql/restart', function(req, res) {
	exec('cd ~/gateway_nodejs && docker-compose restart mysql');
	res.send('Restart mysql');
});




http.listen(5000, function(){
  console.log('listening on *:5000');
});