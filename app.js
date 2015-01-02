/*
	For this challenge I will be coding my response in Node.js. 

*/

var unirest = require('unirest');
var token = null;   //Hold the token variable

//Registration for the API challenge
unirest.post('http://challenge.code2040.org/api/register')
.header({'Accept': 'application/json', 'Content-Type': 'application/json'
})
.send({ "email" : "jen.araujo112@gmail.com", "github" : "https://github.com/jenara112/Code2040-API-Challenge"})
.end(function (response) {
	//Catch any errors
	if (response.error){
		console.log("Something went wrong");
		console.log(response.error); //Print out the error
		console.log(response.body);
	}
	//Set the token to the token variable
	token = response.body.result;
	console.log(token);

    /* Stage 1 Reverse a string challenge */

	//Post the JSON dictionary to the endpoint
	unirest.post('http://challenge.code2040.org/api/getstring')
	.header({'Accept': 'application/json', 'Content-Type': 'application/json'
	})
	.send({ "token" : token})
	.end(function (response) {
	  //Catch any errors
	  if (response.error){
	  	console.log("Something went wrong");
	  	console.log(response.error);
	  	console.log(response.body);
	  }
	  //Variables needed to reverse the string
	  var response_string = response.body.result;
	  var rev_string = "";
	  console.log("This is before the string is reversed " + response_string);
	  
	  //Swap the letters in a string
	  for (var x = response_string.length - 1; x >= 0; x--)
		{
			//Concatanate the value of the iterator into the new string
			rev_string += response_string[x];
		}
	  //Now print out the reversed string
	  console.log("This is the string reversed " + rev_string);

	  //Post the string back the Code 2040 server
	  unirest.post("http://challenge.code2040.org/api/validatestring")
	  .header({'Accept': 'application/json', 'Content-Type': 'application/json'})
	  .send({"token" : token, "string" : rev_string })
	  .end(function (response) {
	  	if (response.error){
	  		console.log("Something went wrong");
	  		console.log(response.error);
	  		console.log(response.body);
	  	}

	  	/* Stage 2 Needle in a Haystack */

	  	//Pull the needle and haystack dictionary
	  	unirest.post('http://challenge.code2040.org/api/haystack')
		.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send({ "token" : token})
		.end(function (response){
			if (response.error){
		  		console.log("Something went wrong");
		  		console.log(response.error);
		  		console.log(response.body);
	  		}

	  		//Store the returned dictonary into a variable
	  		var needle_dictionary = response.body.result.haystack;
	  		var needle_place = 0;
	  		console.log("This is the needle " + response.body.result.needle);


	  		//Now go through the dictionary to find the index of values matching needle
	  		for (var x = 0; x < needle_dictionary.length; x++){

	  			//Catch the position of needle in the dictionary
				if (needle_dictionary[x] == response.body.result.needle){
	  				needle_place = x;
	  			}
	  		}

	  		console.log("The needle is in position " + needle_place);

	  		//Post the need to the Code 2040 server
	  		unirest.post('http://challenge.code2040.org/api/validateneedle')
			.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
			.send({ "token" : token, "needle": needle_place })
			.end(function (response){
				if (response.error){
		  		console.log("Something went wrong");
		  		console.log(response.error);
		  		console.log(response.body);
	  			}

	  			/* Stage III: Pre-Fix */

	  			//Pull the prefix and array dictionary
	  			unirest.post('http://challenge.code2040.org/api/prefix')
				.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
				.send({ "token" : token})
				.end(function (response){
					if (response.error){
			  		console.log("Something went wrong");
			  		console.log(response.error);
			  		console.log(response.body);
		  			}

		  			//Store the prefix and array in seperate values
		  			var prefix = response.body.result.prefix;
		  			console.log("This is the prefix " + prefix);
		  			var array_return = response.body.result.array;
		  			var array_ans = new Array ();

		  			//Now go through the array and find the values that have the prefix
		  			for(var x = 0; x < array_return.length; x++){
		  				if (array_return[x].search(prefix) == -1){

		  					//Push the value of x into another array
		  					array_ans.push(array_return[x]);
		  				}
		  			}

		  			console.log(array_ans);

		  			//Post the new array to Code 2040's servers
		  			unirest.post('http://challenge.code2040.org/api/validateprefix')
					.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
					.send(JSON.stringify({ "token" : token, "array": array_ans}))
					.end(function (response){
					if (response.error){
		  				console.log("Something went wrong");
		  				console.log(response.error);
		  				console.log(response.body);
	  					}

	  					/* Stage IV The Dating Game */

	  					//Pull the datastamp and interval
	  					unirest.post('http://challenge.code2040.org/api/time')
						.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
						.send({ "token" : token})
						.end(function (response){
						if (response.error){
			  				console.log("Something went wrong");
			  				console.log(response.error);
			  				console.log(response.body);
		  				}

		  				//Store the datestamp string into a Date object
		  				var full_date = new Date(Date.parse(response.body.result.datestamp));
		  				console.log(response.body.result.datestamp);
		  				console.log(full_date);

		  				//Add the interval to the date
		  				full_date.setSeconds(response.body.result.interval);
		  				console.log(full_date);

		  				//Convert the date back to the ISO 8601 datestamp
		  				/*Please note that the toISOString function is not
		  				supported in all web browsers */
		  				final_date = full_date.toISOString();
		  				console.log(final_date);

		  				//Now post the code back to the API
		  				unirest.post('http://challenge.code2040.org/api/validatetime')
						.header({'Accept': 'application/json', 'Content-Type': 'application/json'})
						.send({ "token" : token, "datestamp" : final_date })
						.end(function (response){
							if (response.error){
				  				console.log("Something went wrong");
				  				console.log(response.error);
				  				console.log(response.body);
			  				}

			  			});//Ends the validate time post

	  					}); //Ends the retrieve the datestamp and interval request

	  				}); //Ends the post the new array request

	  			}); 	//Ends the retrieve prefix and array request


	  		}); //Ends the post the needle place request	

		}); //Ends the retrieve the need and haystack request


	  }); //Ends the post the reversed string request

	}); //Ends the retrieve token to get the string request

}); //End the registration request


