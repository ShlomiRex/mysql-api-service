// Imports
let express = require('express');
let app = express();
let mysql = require('mysql');

let env = process.env.NODE_ENV || 'development';

// The API service
let api_server_port = 80;
let api_server_host_bind = "0.0.0.0";

// The MySQL connection
let mysql_server_host = process.env.mysql_host || "10.0.0.23";
//Production
let prd_db = "hardware_usage";
let prd_username = process.env.mysql_user;
let prd_password = process.env.mysql_pass;
//Staging
let stg_db = "hardware_usage";
let stg_username = "test";
let stg_password = "";



let mysql_connection = mysql.createConnection({
	host: mysql_server_host,
	user: env ? stg_username : prd_username,
	password: env ? stg_password : prd_password,
	database: env ? stg_db : prd_db
});
mysql_connection.connect((err) => {
	if (err) {
		console.log(err)
	} else {
		console.log("Successfully connected to MySQL server!")
	}
})





app.use(express.json());

app.get("/", function (request, response) {
	response.json({ "Message": "Welcome to Node js" });
});


app.post("/hardware_usage", (request, response) => {
	console.log("Post to hardware_usage called")
	console.log(request.body)

	let cpu_percent = request.body.cpu_percent
	let ram_percent = request.body.ram_percent
	let api_key = request.body.api_key

	if (api_key != null && typeof api_key == "string") {
		if(cpu_percent != null && typeof cpu_percent == "number") {
			let query = `
			INSERT INTO cpu_usage(fk_api_key_id, percent) 
			VALUES(
				(SELECT id FROM api_keys WHERE api_key = '${api_key}'),
				${cpu_percent}
			);
			`;
			mysql_connection.query(query, function(err, results, fields) {
				if (err) {
					console.error(err)
					response.statusCode = 500
					response.send(err)
					return
				} else {
					console.log("Uploaded cpu percent")
				}
			})
		}

		if(ram_percent != null && typeof ram_percent == "number") {
			let query = `
			INSERT INTO ram_usage(fk_api_key_id, percent) 
			VALUES(
				(SELECT id FROM api_keys WHERE api_key = '${api_key}'),
				${ram_percent}
			);
			`;
			mysql_connection.query(query, function(err, results, fields) {
				if (err) {
					console.error(err)
					response.statusCode = 500
					response.send(err)
					return
				} else {
					console.log("Uploaded ram percent")
				}
			})
		}

		response.sendStatus(200)

	} else {
		response.sendStatus(400)
	}


})

app.listen(api_server_port, api_server_host_bind, function () {
	console.log("Server runnning on Port: " + api_server_port);
	if (env == "development") {
		console.log(`Running MySQL as staging with username: ${stg_username} and db: ${stg_db}`)
	} else {
		console.log(`Running MySQL as production with username: ${prd_username} and db: ${prd_db}`)
	}
});
