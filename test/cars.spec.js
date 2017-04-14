/**
* @description: unit tests for car API endpoints
*/
(function(){

'use strict';

// load testng modules
var should = require("should");
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");

// valid car object
var valid_car_specs = {
	make: "Tesla",
	model: "S",
	year: 2012
}

// invalid car object
var invalid_car_specs = {
		make: "Tesla",
		year: 2012
	};

// car object properties to test against
var car_properties = ["model","make","year"];

describe("POST, GET, UPDATE, DELETE Cars: ", function(){
	
	// Unit test for valid post request
	describe("POST car request: ", function(){	
		it("should return success message",function(done){
			server.post("/api/cars")
			.send(valid_car_specs)
		    .expect("Content-type",/json/)
		    .expect(200)
		    .end(function(err,res){
		    	// status code should be 200
		     	res.status.should.equal(200);
		     	res.body.message.should.equal("car added successfully"); 
		     	done();
		    });
		});
	});

	// Unit test for invalid post request
	describe("POST car request: ", function(){	
		it("should return error message",function(done){
			server.post("/api/cars")
			.send(invalid_car_specs)
		    .expect("Content-type",/json/)
		    .expect(200)
		    .end(function(err,res){
		    	// status code should be 200
		     	res.status.should.equal(200);
		     	res.body.error.message.should.equal("car validation failed");  
		     	done();
		    });

		});
	});

	// Unit test for valid get all cars request
	describe("GET all cars request: ", function(){	
		it("should return success message",function(done){
			server.get("/api/cars")
		    .expect("Content-type",/json/)
		    .expect(200) // THis is HTTP response
		    .end(function(err,res){
		    	
		    	// status code should be 200
		     	res.status.should.equal(200);
		     	
		     	// type of results should be of type array
		     	(Array.isArray(res.body.results)).should.be.true(); 

		     	// all elements of array should have 3 properties: model, make and year per the spec
	     		for (var i = 0; i < res.body.results.length; i++){
	     			(Object.keys(res.body.results[i]).length === car_properties.length).should.be.true();
	     			for (var j = 0; j < car_properties.length; j++){
	     				(res.body.results[i].hasOwnProperty(car_properties[j])).should.be.true(); 
	     			}
	     		}
			     	 
		     	done();
		    });

		});
	});

	// TODO: Add more unit tests

});

}())