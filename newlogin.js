var ref = new Firebase('rubbermatch.firebaseIO.com');
var usersRef = new Firebase("rubbermatch.firebaseIO.com/users");
var thisAuthData;
var thisPassword = "password";

// RUNS AUTHENTICATOR ON PAGE LOAD TO CHECK FOR AUTHDATA

$(document).ready(function () {

    authenticator();

});

// LOGIN CONFIRMATION FUNCTION IN CONSOLE

var passwordFunction = function (authData) {

	console.log("user " + authData.uid + " logged in with " + authData)
	
};

//LOGIN FUNCTION IF SUCCESSFULL, TRIGGERS THE AUTHENTICATION FUNCTION

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
    			window.location = "/newgame.html"
			};

	});

};


// LOGS IN USER BASED BUTTON; LAUNCHES LOG IN FUNCTION

$('#exisinguser').click(function (){

	logInThings();
	
});

// SETS USER AVAILABLE TO FALSE, THEN UNAUTHENTICATS USER


//LOGOUT FUNCTION

//AUTHENTICATION FUNCTION

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