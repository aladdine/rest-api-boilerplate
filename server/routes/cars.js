/**
* @description: this module handles requests at /cars and cars/:id endpoints.
*/

(function(){

	'use strict';

	// load NPM core modules
	var express = require("express");
	var router = express.Router();

	// load the car module: it handles MongoDB queries
	var car = require("../models/car.js");

	// getting all cars
	router.get('/', function(req,res){
		car.getAllCars(function(err,cars){
			if(err){
				res.send({error : err});
			} else {
				res.send({results:cars});
			}
		});
	});

	// getting one car
	router.get('/:id', function(req,res){
		car.getOneCarById(req.params.id,function(err,car){
			if(err){
				res.send({error : err});
			} else {
				res.send({results:car});
			}
		});
	});

	// getting all cars
	router.post('/', function(req,res){

		var car_specs = req.body;
		
		car.addOneCar(car_specs, function(err,car){
			if(err){
				res.send({error : err});
			} else {
				res.send({message:"car added successfully"});
			}
		});
	
	});

	// updating one car
	router.put('/:id', function(req,res){
		
		var car_id = req.params.id;
		var new_car_specs = req.body;
		
		car.updateOneCar(car_id, new_car_specs, {}, function(err,car){
			if(err){
				res.send({error : err});
			} else {
				res.send({message:"car updated successfully"});
			}
		});
		
	});

	// deleting one car
	router.delete('/:id', function(req,res){
		
		var car_id = req.params.id;

		car.deleteOneCar(car_id, function(err,car){
			if(err){
				res.send({error : err});
			} else {
				res.send({message:"car deleted successfully"});
			}
		});
		
	});

	module.exports = router;

})();