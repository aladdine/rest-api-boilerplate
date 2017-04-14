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

	// Setup mongoose database connection. 
	// To use local MongoDB instance, replace line below with: mongoose.connect('mongodb://localhost/db');
	// We use mLab here because of the simplified overhead, ease of deplyment and analytics tools it provides.
	// mongoose.connect('mongodb://carratingdev:carratingdev00@ds145800.mlab.com:45800/car-ratings'); 
	mongoose.connect('mongodb://localhost/db');
	var db = mongoose.connection;

	// setup default API endpoint
	app.get('/', function (req,res){
		res.send({"message":"API running. Please refer to documentation for access and usage."});
	});

	// APIs and correponding endpoints
	app.use("/api/cars", cars);
	app.use("/api/ratings", ratings);

	// Make API endpoints accessible via port 3000
	app.listen("3000", function(){
		console.log("running on port 3000");
	});

})()