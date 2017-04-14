/**
* @description: this module handles all rating-related MongoDB queries
*/

(function(){

	'use strict';

	var mongoose = require("mongoose");

	// rating data schema
	// NOTE: carId property refers to the id of the car to which the rating corresponds.
	// several ratings maybe associated with the same carId (one to many relationship)
	var rating_schema = mongoose.Schema({
		
		reviewedBy: {
			required: true,
			type: String
		},
		safety: {
			required: true,
			type: Number,
			min: 0,
			max: 5
		},
		technology: {
			required: true,
			type: Number,
			min: 0,
			max: 5
		},
		performance: {
			required: true,
			type: Number,
			min: 0,
			max: 5
		},
		interior: {
			required: true,
			type: Number,
			min: 0,
			max: 5
		},
		reliability: {
			required: true,
			type: Number,
			min: 0,
			max: 5
		},
		overall: {
			required: true,
			type: Number,
			min: 0,
			max: 5
		},
		carId: {
			required: true,
			type: mongoose.Schema.Types.ObjectId
		}
	
	});

	var rating = module.exports = mongoose.model("rating", rating_schema);

	// get all ratings
	module.exports.getAllRatings = function(callback){		
		// keep query object empty to return all ratings
		var query = {};
		rating.find(query,callback);
	}

	// get ratings by id
	module.exports.getRatingsById = function(id, callback){
		var options = {"_id": 0, "__v": 0};
		var query = {
			carId: id
		};
		rating.find(query, options, callback);
	}

	// add one rating
	module.exports.addOneRating = function(rating_values, callback) {
		var add = rating_values;
		rating.create(add,callback);
	}

	// find rating by id and update it
	module.exports.updateOneRating = function(id, new_rating_values, options, callback) {
		
		var query = {
			_id: id
		}

		var data = new_rating_values;

		rating.findOneAndUpdate(query, data, {}, callback);
	}

	// find rating by id and delete it
	module.exports.deleteOneRating = function(id, callback){
		
		var query = {
			_id: id
		}
		
		rating.remove(query, callback);
	}

})()