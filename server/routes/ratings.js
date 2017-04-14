/**
* @description: this module handles requests at /ratings and ratings/:id endpoints.
*/

(function(){

	'use strict';

	// load NPM core modules
	var express = require("express");
	var router = express.Router();

	// load custom modules
	var car = require("../models/car.js");
	var rating = require("../models/rating.js");

	// get all ratings
	router.get('/', function(req,res){
		// get all ratings
		rating.getAllRatings(function(err,ratings){

			if(err){
				res.send({error : err});
			} else {
				// get car specs corresponding to each rating
				getAllSpecs(ratings,[],function(out){
					res.send({results:out});
				});			
			}
		
		});
	});

	// getting ratings by id
	router.get('/:id', function(req,res){
		rating.getRatingsById(req.params.id,function(err,ratings){
			if(err){
				res.send({error : err});
			} else {
				// get car specs corresponding to rating
				getAllSpecs(ratings,[],function(out){
					res.send({results:out});
				});	
			}
		});
	});

	// getting all cars
	router.post('/', function(req,res){

		var rating_values = req.body;

		// this array holds the properties to calculate average
		var properties_to_average = ["interior","performance","reliability","safety","technology"];
		// these weights allow calculating weighted averages. The order needs to match properties.
		var property_weights = [1,1,1,1,1];
		// calculate average value of ratings
		rating_values.overall = averagedWeights(req.body,properties_to_average,property_weights);
		rating.addOneRating(rating_values, function(err,rating){
			if(err){
				res.send({error : err});
			} else {
				res.send({results:"rating added successfully"});
			}
		});
	
	});

	// updating one car
	router.put('/:id', function(req,res){
		
		var rating_id = req.params.id;
		var new_rating_values = req.body;
		var properties_to_average = ["interior","performance","reliability","safety","technology"];
		var property_weights = [1,1,1,1,1];
		new_rating_values.overall = averagedWeights(req.body,properties_to_average,property_weights);
		
		rating.updateOneRating(rating_id, new_rating_values, {}, function(err,rating){
			if(err){
				res.send({error : err});
			} else {
				res.send({results:"rating updated successfully"});
			}
		});
		
	});

	// deleting one car
	router.delete('/:id', function(req,res){
		
		var rating_id = req.params.id;

		rating.deleteOneRating(rating_id, function(err,rating){
			if(err){
				res.send({error : err});
			} else {
				res.send({results:"rating deleted successfully"});
			}
		});
		
	});

	// takes an array of rating objects and return corresponding car specs
	function getAllSpecs(ratings,out,callback){

		// if all ratings are processed or ratings array is empty, return response
		if (ratings.length == 0) {
			callback(out);
		} else {
			
			// if a rating has a carId property, get the corresponding car properties
			if (ratings[ratings.length-1]["carId"]) {

				car.getOneCarById(ratings[ratings.length-1]["carId"],function(err,car){

					if (car) {

						out.push({
							model: format(car,"model"),
							make: format(car,"make"),
							year: format(car,"year"),
							reviewedBy: format(ratings[ratings.length-1],"reviewedBy"),
							reliability: format(ratings[ratings.length-1],"reliability"),
							performance: format(ratings[ratings.length-1],"performance"),
							safety: format(ratings[ratings.length-1],"safety"),
							technology: format(ratings[ratings.length-1],"technology"),
							interior: format(ratings[ratings.length-1],"interior"),
							overall: format(ratings[ratings.length-1],"overall")
						});

					}

					// remove the rating processed already from array and continue to next 
					ratings.pop();
					getAllSpecs(ratings, out, callback);
				});

			} else {
				// remove the rating processed already from array and continue to next 
				ratings.pop();
				getAllSpecs(ratings, out, callback);
			}


		
		}
	}

	// takes an object and a property and checks if the property has a value.
	// If the value is missing, it gives it a custom value.
	function format(obj,property){

		// objct of custom values
		var default_values = {
			model: "model not found",
			make: "make not found",
			year: "year not found",
			reviewedBy: null,
			reliability: null,
			performance: null,
			technology: null,
			interior: null,
			safety: null,
			overall: null
		}

		if (obj.hasOwnProperty(property) || obj[property] != null) {
			return obj[property];
		} else {
			return default_values[property];
		}

	}

	// calculate overall rating by averaging properties
	function averagedWeights(obj,array_of_properties,property_weights){
		
		var sum = 0;
		var n = 0;

		for (var i = 0; i < array_of_properties.length; i++) {
			if(obj.hasOwnProperty(array_of_properties[i])){
				sum += obj[array_of_properties[i]]*property_weights[i];
				n += property_weights[i]; 
			}
		}
		
		if (n > 0) {
			return sum/n;
		}	else {
			return null
		}	

	}

	module.exports = router;

})();