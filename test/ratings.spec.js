/**
* @description: unit tests for rating API endpoints
*/
(function(){

'use strict';

// load testng modules
var should = require("should");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");

// ratings object properties to test against
var rating_properties = ["model","make","year","reviewedBy","reliability","performance","technology","interior","safety","overall"];

describe("POST, GET, UPDATE, DELETE Ratings: ", function(){

	// Unit test for valid get all cars request
	describe("GET all ratings request: ", function(){	
	
		it("should return success message",function(done){
			server.get("/api/ratings")
		    .expect("Content-type",/json/)
		    .expect(200) // THis is HTTP response
		    .end(function(err,res){

		    	// status code should be 200
		     	res.status.should.equal(200);
		     	
		     	// type of results should be of type array
		     	(Array.isArray(res.body.results)).should.be.true(); 

		     	// all elements of array should have all ratings properties per the spec
	     		for (var i = 0; i < res.body.results.length; i++){
	     			(Object.keys(res.body.results[i]).length === rating_properties.length).should.be.true();
	     			for (var j = 0; j < rating_properties.length; j++){
	     				(res.body.results[i].hasOwnProperty(rating_properties[j])).should.be.true(); 
	     			}
	     		}
			     	 
		     	done();
		    });
		});

	});

	// TODO: Add more unit tests

});

}())