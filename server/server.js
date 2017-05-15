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

	var ps = '';

	var execDockerCompose = exec("docker-compose ps", { cwd: cwd });
		execDockerCompose.stdout.on('data', function(data) { 
			ps += data.toString();
		});
		execDockerCompose.on('exit', function(data) { 
		    var lines = ps.split("\n");
		    var containers = [];
		    if(lines.length > 2){
		        
		        for(var key=2; key < lines.length; key++){
		            var stats = lines[key].replace("\r").split("   ");
		            
		            if(stats[0] && stats[1])
		                containers.push({name: stats[0], command: stats[1], state: stats[2], ports: stats[3]})
		        }
		    }

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
		
		execDockerCompose.stdout.on('data', function(data) { 
			console.log('stdout data:', data);
		});
		execDockerCompose.stderr.on('data', function(data) {
			console.log('stderr data:', data);
		});

		execDockerCompose.on('exit', function() {
			res.status(200).send('hello there');
		});

});

app.get('/mysql/stop', function(req, res) {
	
	var execDockerCompose = exec("docker-compose stop mysql", { cwd: cwd });
		execDockerCompose.stdout.on('data', function(data) { 
			console.log('stdout data:', data);
		});
		execDockerCompose.stderr.on('data', function(data) {
			console.log('stderr data:', data);
		});

		execDockerCompose.on('exit', function() {
			res.status(200).send('Mysql stopped');
		});

});

app.get('/myql/restart', function(req, res) {
	exec('cd ~/gateway_nodejs && docker-compose restart mysql');
	res.send('Restart mysql');
});




http.listen(5000, function(){
  console.log('listening on *:5000');
});