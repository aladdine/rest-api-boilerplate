/**
* @description: this module handles all car-related MongoDB queries
*/

(function(){

	'use strict';

	var mongoose = require("mongoose");

	// car data schema
	var car_schema = mongoose.Schema({
		make: {
			required: true,
			type: String
		},
		model: {
			required: true,
			type: String
		},
		year: {
			required: true,
			type: Number
		}
	});

	// attach car data schema to car object
	var car = module.exports = mongoose.model("car", car_schema);

	// get all cars
	module.exports.getAllCars = function(callback){
		
		// Mongoose returns data with _id and __v properties. Remove them to match response specs.
		var options = {"_id": 0, "__v": 0};
		
		// keep query obj empty to return all cars
		var query = {};
		
		car.find(query,options,callback);
	}

	// get one car by id
	module.exports.getOneCarById = function(id, callback){
		// Remove unnecessary properties to match response specs.
		var options = {"_id": 0, "__v": 0};
		car.findById(id, options, callback);
	}

	// add one car
	module.exports.addOneCar = function(car_specs, callback) {
		var add = car_specs;
		car.create(add,callback);
	}

	// find car by id and update it
	module.exports.updateOneCar = function(id, new_car_specs, options, callback) {
		
		var query = {
			_id: id
		}

		var data = new_car_specs;
		car.findOneAndUpdate(query, data, options, callback);
	}

	// find car by id and delete it
	module.exports.deleteOneCar = function(id, callback){
		
		var query = {
			_id: id
		}
		
		car.remove(query, callback);
	}

})()