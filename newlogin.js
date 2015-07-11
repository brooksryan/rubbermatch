var ref = new Firebase('rubbermatch.firebaseIO.com');

var thisPassword = "password";

var passwordFunction = function (authData) {

	console.log("user " + authData.uid + " logged in with " + authData)
	
};

function logInThings(){

		ref.authWithPassword({

			email: $('#emailinput').val(),
			password:$('#mypassword').val()
			
		}, 
		
		function (error,authData) {
		debugger
    		if (error) {

    			console.log(error)
    		
    		} else {

    			passwordFunction (authData);
			};

	});
};


// Existing User Button

$('#exisinguser').click(function (){

	logInThings();
	
});


$('#logmeout').click(function (){ 
	ref.unauth();
});



/*

		ref.authWithPassword({
      // email input 
   		email:"user@email.com",
      // password input 
    	password:"password"

    }, function (error,authData) {

    	if (error) {

    		console.log("Ya fucked up!")

    	} else {

    		console.log(myName + thisPassword)
		};

	});
});

*/



/* var logauthdata = function (error, authdata){

	if (error) {

		console.log("login failed", error);
	}

	else {

		console.log("this is the authpayload" + authData);
		return authData


	}
};


/*$('#exisinguser').click(

	function authpayload(){
    },

    function logauthdata (error,authData){

    });

      // clears input fields

    $('#emailinput').val('');
    $('#mypassword').val('');

  ;
*/