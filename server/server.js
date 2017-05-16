var app  	   = require('express')();
var http	   = require('http').Server(app);
var exec 	   = require('child_process').exec;
var cwd 	   = '../gateway_nodejs';











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

	  ____       _                           
	 / ___| __ _| |_ _____      ____ _ _   _ 
	| |  _ / _` | __/ _ \ \ /\ / / _` | | | |
	| |_| | (_| | ||  __/\ V  V / (_| | |_| |
	 \____|\__,_|\__\___| \_/\_/ \__,_|\__, |
	                                   |___/ 

*/

// ======================== Docker ======================== //
/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/gateway/docker/start', function(req, res) {

	 dockerComposeStart('gateway')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "kitset_gateway container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/gateway/docker/stop', function(req, res) {
	
	dockerComposeStop('gateway')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_gateway container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/gateway/docker/restart', function(req, res) {
	
	dockerComposeRestart('gateway')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_gateway container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

// ======================== End Docker ======================== //
// ======================== Git ======================== //

/*	~~~~~~~~~

	Pull

~~~~~~~~~ */
app.get('/gateway/git/pull', function(req,res) {

	var gitPull = exec('cd ~/gateway_nodejs && git pull --all && mv .env.staging .env');
		gitPull.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		gitPull.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		gitPull.on('exit', function(data) {
			console.log('Exited: ', data);

			res.status(200)
			   .send({
			   		data: data
			   });
		});
});

// ======================== End git ======================== //
// ======================== Artisan ======================== //





// ======================== End artisan ======================== //
















/*

	 __  __                 _ 
	|  \/  |_   _ ___  __ _| |
	| |\/| | | | / __|/ _` | |
	| |  | | |_| \__ \ (_| | |
	|_|  |_|\__, |___/\__, |_|
	        |___/        |_|  

*/
// ======================== Docker ======================== //
/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/db/mysql/docker/start', function(req, res) {

	 dockerComposeStart('mysql')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "kitset_db_mysql container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/db/mysql/docker/stop', function(req, res) {
	
	dockerComposeStop('mysql')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_db_mysql container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/db/mysql/docker/restart', function(req, res) {
	
	dockerComposeRestart('mysql')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_db_mysql container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

// ======================== End Docker ======================== //
// ======================== Git ======================== //




// ======================== End Git ======================== //
// ======================== Artisan ======================== //



// ======================== End artisan ======================== //














/*

	 __  __                         
	|  \/  | ___  _ __   __ _  ___  
	| |\/| |/ _ \| '_ \ / _` |/ _ \ 
	| |  | | (_) | | | | (_| | (_) |
	|_|  |_|\___/|_| |_|\__, |\___/ 
	                    |___/       

*/
// ======================== Docker ======================== //
/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/db/mongo/docker/start', function(req, res) {

	 dockerComposeStart('mongodb')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "kitset_db_mongo container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/db/mongo/docker/stop', function(req, res) {
	
	dockerComposeStop('mongodb')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_db_mongo container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/db/mongo/docker/restart', function(req, res) {

	dockerComposeRestart('mongodb')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_db_mongo container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});



// ======================== End Docker ======================== //
// ======================== Git ======================== //




// ======================== End Git ======================== //
// ======================== Artisan ======================== //



// ======================== End artisan ======================== //























/*

	    _    ____ ___   ____        _ _     _           
	   / \  |  _ \_ _| | __ ) _   _(_) | __| | ___ _ __ 
	  / _ \ | |_) | |  |  _ \| | | | | |/ _` |/ _ \ '__|
	 / ___ \|  __/| |  | |_) | |_| | | | (_| |  __/ |   
	/_/   \_\_|  |___| |____/ \__,_|_|_|\__,_|\___|_|   
	                                                    

*/

// ======================== Docker ======================== //
/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/client/api/docker/start', function(req, res) {

	 dockerComposeStart('client-api')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "kitset_client_api container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/client/api/docker/stop', function(req, res) {
	
	dockerComposeStop('client-api')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_client_api container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/client/api/docker/restart', function(req, res) {

	dockerComposeRestart('client-api')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_client_api container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

// ======================== End Docker ======================== //
// ======================== Git ======================== //
/*	~~~~~~~~~

	Pull

~~~~~~~~~ */
app.get('/client/api/git/pull', function(req, res) {

	var gitPull = exec('cd ~/client_webapp_apibuilder && git pull --all && cd public && bower install');
		gitPull.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		gitPull.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		gitPull.on('exit', function(data) {
			console.log('Exited: ', data);
			res.status(200)
			   .send({
			   		data: data
			   });
		});
});



// ======================== End Git ======================== //
// ======================== Artisan ======================== //





// ======================== End artisan ======================== //
















/*

	 _   _ ___   ____        _ _     _           
	| | | |_ _| | __ ) _   _(_) | __| | ___ _ __ 
	| | | || |  |  _ \| | | | | |/ _` |/ _ \ '__|
	| |_| || |  | |_) | |_| | | | (_| |  __/ |   
	 \___/|___| |____/ \__,_|_|_|\__,_|\___|_|   
	                                             

*/
// ======================== Docker ======================== //




// ======================== End Docker ======================== //
// ======================== Git ======================== //




// ======================== End Git ======================== //
// ======================== Artisan ======================== //



// ======================== End artisan ======================== //

















/*

	__        _______   ____        _ _     _           
	\ \      / /  ___| | __ ) _   _(_) | __| | ___ _ __ 
	 \ \ /\ / /| |_    |  _ \| | | | | |/ _` |/ _ \ '__|
	  \ V  V / |  _|   | |_) | |_| | | | (_| |  __/ |   
	   \_/\_/  |_|     |____/ \__,_|_|_|\__,_|\___|_|   
	                                                    

*/
// ======================== Docker ======================== //




// ======================== End Docker ======================== //
// ======================== Git ======================== //




// ======================== End Git ======================== //
// ======================== Artisan ======================== //



// ======================== End artisan ======================== //





















/*

	 ____                        _             _           _ 
	/ ___| _   _ _ __   ___ _ __| | ___   __ _(_) ___ __ _| |
	\___ \| | | | '_ \ / _ \ '__| |/ _ \ / _` | |/ __/ _` | |
	 ___) | |_| | |_) |  __/ |  | | (_) | (_| | | (_| (_| | |
	|____/ \__,_| .__/ \___|_|  |_|\___/ \__, |_|\___\__,_|_|
	            |_|                      |___/               

*/
// ======================== Docker ======================== //
/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/ms/auth/docker/start', function(req, res) {

	 dockerComposeStart('superlogical')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "kitset_superlogical container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/ms/auth/docker/stop', function(req, res) {
	
	dockerComposeStop('superlogical')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_superlogical container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/ms/auth/docker/restart', function(req, res) {

	dockerComposeRestart('superlogical')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_superlogical container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

// ======================== End Docker ======================== //
// ======================== Git ======================== //
/*	~~~~~~~~~

	Pull

~~~~~~~~~ */
app.get('/ms/auth/git/pull', function(req, res) {

	var gitPull = exec('cd ~/microservice_superlogical && git pull --all && mv .env.staging .env && composer update');
		gitPull.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		gitPull.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		gitPull.on('exit', function(data) {
			console.log('Exited: ', data);
			res.status(200)
			   .send({
			   		data: data
			   });
		});
});



// ======================== End Git ======================== //
// ======================== Artisan ======================== //
/*	~~~~~~~~~

	Migrate and seed

~~~~~~~~~ */
app.get('/ms/auth/artisan/migrateandseed', function(req, res) {

	var artisanMigrateAndSeed = exec('cd ~/microservice_superlogical && php artisan migrate:refresh --seed');
		artisanMigrateAndSeed.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		artisanMigrateAndSeed.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		artisanMigrateAndSeed.on('exit', function(data) {
			console.log('Exited: ', data);
			res.status(200)
			   .send({
			   		data: data
			   });
		});

});




// ======================== End artisan ======================== //




















/*

	 __  __ ____               _    ____ ___ 
	|  \/  / ___|             / \  |  _ \_ _|
	| |\/| \___ \   _____    / _ \ | |_) | | 
	| |  | |___) | |_____|  / ___ \|  __/| | 
	|_|  |_|____/          /_/   \_\_|  |___|
	                                         

*/

// ======================== Docker ======================== //

/*	~~~~~~~~~

	Start

~~~~~~~~~ */
app.get('/ms/api/docker/start', function(req, res) {

	 dockerComposeStart('server-api')
	.then(function(data) {

		res.status(200)
		   .send({
		   		message: "kitset_server_api container started"
		   });
	})
	.catch(function(error) {
		console.log('Something went wrong...', error);
	});

});

/*	~~~~~~~~~

	Stop

~~~~~~~~~ */
app.get('/ms/api/docker/stop', function(req, res) {
	
	dockerComposeStop('server-api')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_server_api container stopped"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});

/*	~~~~~~~~~

	Restart

~~~~~~~~~ */
app.get('/ms/api/docker/restart', function(req, res) {

	dockerComposeRestart('server-api')
		.then(function(data) {
			res.status(200)
			   .send({
			   		message: "kitset_server_api container restarted"
			   });
		})
		.catch(function(error) {
			console.log('Something went wrong...', error);
		});

});


// ======================== End Docker ======================== //
// ======================== Git ======================== //
/*	~~~~~~~~~

	Pull

~~~~~~~~~ */
app.get('/ms/api/git/pull', function(req, res) {

	var gitPull = exec('cd ~/microservice_api && git pull --all && mv .env.staging .env && composer update');
		gitPull.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		gitPull.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		gitPull.on('exit', function(data) {
			console.log('Exited: ', data);

			res.status(200)
			   .send({
			   		data: data
			   });
		});
});


// ======================== End Git ======================== //
// ======================== Artisan ======================== //
/*	~~~~~~~~~

	Migrate and seed

~~~~~~~~~ */
app.get('/ms/api/artisan/migrateandseed', function(req, res) {

	var artisanMigrateAndSeed = exec('cd ~/microservice_api && php artisan migrate:refresh --seed');
		artisanMigrateAndSeed.stdout.on('data', function(data){
			console.log('stdout: ', data);
		});
		artisanMigrateAndSeed.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		artisanMigrateAndSeed.on('exit', function(data) {
			console.log('Exited: ', data);

			res.status(200)
			   .send({
			   		data: data
			   });
		});
});






// ======================== End artisan ======================== //
















/*

	 __  __ ____           __        _______ 
	|  \/  / ___|          \ \      / /  ___|
	| |\/| \___ \   _____   \ \ /\ / /| |_   
	| |  | |___) | |_____|   \ V  V / |  _|  
	|_|  |_|____/             \_/\_/  |_|    
	                                         

*/
// ======================== Docker ======================== //




// ======================== End Docker ======================== //
// ======================== Git ======================== //
/*	~~~~~~~~~

	Pull

~~~~~~~~~ */
app.get('/ms/wf/git/pull', function(req, res) {

	var gitPull = exec('cd ~/microservice_wf && git pull --all && mv .env.staging .env');
		gitPull.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		gitPull.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		gitPull.on('exit', function(data) {
			console.log('Exited: ', data);

			res.status(200)
			   .send({
			   		data: data
			   });
		});
});



// ======================== End Git ======================== //
// ======================== Artisan ======================== //
/*	~~~~~~~~~

	Migrate and seed

~~~~~~~~~ */
app.get('/ms/wf/artisan/migrateandseed', function(req, res) {

	var artisanMigrateAndSeed = exec('cd ~/microservice_wf && php artisan migrate:refresh --seed');
		artisanMigrateAndSeed.stdout.on('data', function(data){
			console.log('stdout: ', data);
		});
		artisanMigrateAndSeed.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		artisanMigrateAndSeed.on('exit', function(data) {
			console.log('Exited: ', data);

			res.status(200)
			   .send({
			   		data: data
			   });
		});
});


// ======================== End artisan ======================== //


















/*

	 __  __ ____            _   _ ___ 
	|  \/  / ___|          | | | |_ _|
	| |\/| \___ \   _____  | | | || | 
	| |  | |___) | |_____| | |_| || | 
	|_|  |_|____/           \___/|___|
	                                  

*/
// ======================== Docker ======================== //




// ======================== End Docker ======================== //
// ======================== Git ======================== //
/*	~~~~~~~~~

	Pull

~~~~~~~~~ */
app.get('/ms/ui/git/pull', function(req, res) {

	var gitPull = exec('cd ~/microservice_ui && git pull --all && mv .env.staging .env');
		gitPull.stdout.on('data', function(data) {
			console.log('stdout: ', data);
		});
		gitPull.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		gitPull.on('exit', function(data) {
			console.log('Exited: ', data);
			res.status(200)
			   .send({
			   		data: data
			   });
		});
});



// ======================== End Git ======================== //
// ======================== Artisan ======================== //
/*	~~~~~~~~~

	Migrate and seed

~~~~~~~~~ */
app.get('/ms/ui/artisan/migrateandseed', function(req, res) {

	var artisanMigrateAndSeed = exec('cd ~/microservice_ui && php artisan migrate:refresh --seed');
		artisanMigrateAndSeed.stdout.on('data', function(data){
			console.log('stdout: ', data);
		});
		artisanMigrateAndSeed.stderr.on('data', function(data) {
			console.log('stderr: ', data);
		});
		artisanMigrateAndSeed.on('exit', function(data) {
			console.log('Exited: ', data);

			res.status(200)
			   .send({
			   		data: data
			   });
		});
});


// ======================== End artisan ======================== //





















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