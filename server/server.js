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




/*

	  ____            _        _                     
	 / ___|___  _ __ | |_ __ _(_)_ __   ___ _ __ ___ 
	| |   / _ \| '_ \| __/ _` | | '_ \ / _ \ '__/ __|
	| |__| (_) | | | | || (_| | | | | |  __/ |  \__ \
	 \____\___/|_| |_|\__\__,_|_|_| |_|\___|_|  |___/
	                                                 

*/

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

		    res.status(200).send({'containersArray' : containers});
		});

});






/*

	 __  __                 _ 
	|  \/  |_   _ ___  __ _| |
	| |\/| | | | / __|/ _` | |
	| |  | | |_| \__ \ (_| | |
	|_|  |_|\__, |___/\__, |_|
	        |___/        |_|  

*/

/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/mysql/start', function(req, res) {

	var execDockerCompose  = exec("docker-compose up -d mysql", { cwd: cwd });
		
		execDockerCompose.stdout.on('data', function(data) { 
			console.log('stdout data:', data);
		});
		execDockerCompose.stderr.on('data', function(data) {

			console.log('stderr data:', data);
		});

		execDockerCompose.on('exit', function(data) {
			// data == 1 FAILURE
			console.log('Exited:', data);

			res.status(200).send('hello there');
		});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
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

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/myql/restart', function(req, res) {
	
	var execDockerCompose

});



/*

	 __  __                         
	|  \/  | ___  _ __   __ _  ___  
	| |\/| |/ _ \| '_ \ / _` |/ _ \ 
	| |  | | (_) | | | | (_| | (_) |
	|_|  |_|\___/|_| |_|\__, |\___/ 
	                    |___/       

*/
/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/mongo/start', function(req, res) {

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

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/mongo/stop', function(req, res) {
	
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

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/mongo/restart', function(req, res) {
	exec('cd ~/gateway_nodejs && docker-compose restart mysql');
	res.send('Restart mysql');
});









/*

	    _    ____ ___   ____        _ _     _           
	   / \  |  _ \_ _| | __ ) _   _(_) | __| | ___ _ __ 
	  / _ \ | |_) | |  |  _ \| | | | | |/ _` |/ _ \ '__|
	 / ___ \|  __/| |  | |_) | |_| | | | (_| |  __/ |   
	/_/   \_\_|  |___| |____/ \__,_|_|_|\__,_|\___|_|   
	                                                    

*/
















/*

	 __  __ ____               _    ____ ___ 
	|  \/  / ___|             / \  |  _ \_ _|
	| |\/| \___ \   _____    / _ \ | |_) | | 
	| |  | |___) | |_____|  / ___ \|  __/| | 
	|_|  |_|____/          /_/   \_\_|  |___|
	                                         

*/



/*

	 __  __ ____           __        _______ 
	|  \/  / ___|          \ \      / /  ___|
	| |\/| \___ \   _____   \ \ /\ / /| |_   
	| |  | |___) | |_____|   \ V  V / |  _|  
	|_|  |_|____/             \_/\_/  |_|    
	                                         

*/




/*

	 __  __ ____            _   _ ___ 
	|  \/  / ___|          | | | |_ _|
	| |\/| \___ \   _____  | | | || | 
	| |  | |___) | |_____| | |_| || | 
	|_|  |_|____/           \___/|___|
	                                  

*/











// var dockerComposeStop = function(serviceName, stdOutAlt, stdErrAlt, exitAlt) {

// 	var execDockerCompose = exec("docker-compose stop mysql", { cwd: cwd });
// 		execDockerCompose.stdout.on('data', function(data) { 
// 			console.log('stdout data:', data);
// 		});
// 		execDockerCompose.stderr.on('data', function(data) {
// 			console.log('stderr data:', data);
// 		});

// 		execDockerCompose.on('exit', function() {
// 			res.status(200).send('Mysql stopped');
// 		});

// }









http.listen(5000, function(){
  console.log('listening on *:5000');
});