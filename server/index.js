/**
* @description: this is the root module of the API
*/

(function(){

	'use strict';

	// Load core NPM modules: express, body-parser and mongoose
	var express = require("express");
	var app = express();
	var bodyParser = require("body-parser");
	var mongoose = require("mongoose");

	// Load custom node modules
	var cars = require("./routes/cars");
	var ratings = require("./routes/ratings");

	// Setup url encoding
	app.use(
		bodyParser.urlencoded({
	    	extended : true
		})
	);

	app.use(bodyParser.json());

	// Setup mongoose database connection
	mongoose.connect('mongodb://localhost/db');
	var db = mongoose.connection;

	// setup default API endpoint
	app.get('/', function (req,res){
		res.send('API running. Please refer to documentation for access and usage.');
	});

	// APIs and correponding endpoints
	app.use("/api/cars", cars);
	app.use("/api/ratings", ratings);

	// Make API endpoints accessible via port 3000
	app.listen("3000", function(){
		console.log("running on port 3000");
	});

})()