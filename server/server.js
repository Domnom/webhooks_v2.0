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

	 dockerComposeStart('mysql')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "Mysql container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/mysql/stop', function(req, res) {
	
	dockerComposeStop('mysql')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "Mysql container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/mysql/restart', function(req, res) {
	
	dockerComposeRestart('mysql')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "Mysql container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

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

	 dockerComposeStart('mongodb')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "Mongodb container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/mongo/stop', function(req, res) {
	
	dockerComposeStop('mongodb')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "Mongodb container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/mongo/restart', function(req, res) {

	dockerComposeRestart('mongodb')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "Mongodb container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

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










var dockerComposeStart = function(serviceName, stdOutAlt, stdErrAlt, exitAlt) {

	return new Promise (function (thenCallback, catchCallback) {

		var execDockerCompose = exec("docker-compose up -d " + serviceName, { cwd: cwd });
			
			execDockerCompose.stdout.on('data', function(data) { 
				console.log('stdout data:', data);
			});
			execDockerCompose.stderr.on('data', function(data) {
				console.log('stderr data:', data);
			});

			execDockerCompose.on('exit', function(data) {
				
				if (data == 0) {
			// -- SUCCESS
					thenCallback(data);
				} else {
			// -- FAILURE
					catchCallback(data);

				}
			});
	
	});
}



var dockerComposeStop = function(serviceName, stdOutAlt, stdErrAlt, exitAlt) {

	return new Promise (function (thenCallback, catchCallback) {

		var execDockerCompose = exec("docker-compose stop " + serviceName, { cwd: cwd });
			
			execDockerCompose.stdout.on('data', function(data) { 
				console.log('stdout data:', data);
			});
			execDockerCompose.stderr.on('data', function(data) {
				console.log('stderr data:', data);
			});

			execDockerCompose.on('exit', function(data) {

				if (data == 0) {
			// -- SUCCESS
					thenCallback(data);
				} else {
			// -- FAILURE
					catchCallback(data);

				}
			});
	
	});
}

var dockerComposeRestart = function(serviceName, stdOutAlt, stdErrAlt, exitAlt) {

	return new Promise (function (thenCallback, catchCallback) {

		var execDockerCompose = exec("docker-compose restart " + serviceName, { cwd: cwd });
			
			execDockerCompose.stdout.on('data', function(data) { 
				console.log('stdout data:', data);
			});
			execDockerCompose.stderr.on('data', function(data) {
				console.log('stderr data:', data);
			});

			execDockerCompose.on('exit', function(data) {

				if (data == 0) {
			// -- SUCCESS
					thenCallback(data);
				} else {
			// -- FAILURE
					catchCallback(data);

				}
			});
	
	});
}






http.listen(5000, function(){
  console.log('listening on *:5000');
});