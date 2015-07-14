var ref = new Firebase('rubbermatch.firebaseIO.com');
var usersRef = new Firebase("rubbermatch.firebaseIO.com/users");
var thisAuthData;
var thisPassword = "password";

$(document).ready(function () {

    authenticator();

});

var passwordFunction = function (authData) {

	console.log("user " + authData.uid + " logged in with " + authData)
	
};

function logInThings(){

		ref.authWithPassword({

			email: $('#emailinput').val(),
			password:$('#mypassword').val()
			
		}, 
		
		function (error,authData) {

    		if (error) {

    			console.log(error)
    		
    		} else {

    			authenticator (authData);
			};

	});

};


// Existing User Button

$('#exisinguser').click(function (){

	logInThings();
	
});


$('#logmeout').click(function (){ 
	debugger
	usersRef.child(thisAuthData.uid).update({
          
        available: false

    }, 

    logOutFunction());

});

function logOutFunction () {

	console.log('client unauthenticated');

	ref.unauth();

}

function authenticator() {
    ref.onAuth(function(authData) {
  
        if (authData) {
            
            thisAuthData = authData;
            console.log("Authenticated with uid:", thisAuthData);
            usersRef.child(authData.uid).update({
          
            available: true

            });

        }
    
    });

};



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