var express = require('express');
var app = express();
let mysql = require('mysql');

console.log("Environment:")
console.log(process.env)

var port = 80;
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'shlomid',
	password: '',
	database: 'hardware_usage'
});

app.get("/", function (request, response) {
	response.json({ "Message": "Welcome to Node js" });
});

app.listen(port, "0.0.0.0", function () {
	var datetime = new Date();
	var message = "Server runnning on Port: " + port;
	console.log(message);
});
