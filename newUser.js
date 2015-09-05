

// New User 
 
var USERS_LOCATION = new Firebase('rubbermatch.firebaseIO.com/');
var name = $('#emailinput').val();
var thispassword = $('#mypassword').val();
var newLoginData;
var newName;


/*function validateInputs() {
    var x = document.forms["thisLoginForm"]["userNameField"]['emailField']['passwordField'].value;
    if (x == null || x == "") {
        alert("Please fill out all fields");
        return false
    }
}
*/
  
  //var companyRef = ref.child("company")
  
$('#newusersubmit').click(function(){

    //validateInputs();

// Clicking New User creates this User w/ login in firebase login 
//System !NOT! in database

    USERS_LOCATION.createUser({

        email: $('#emailinput').val(),
        password: $('#mypassword').val()
        
        }, function(error, userData) {

            if (error) {

                console.log("error creating user:", error);

            } else { 

                  var newUserName = $('#userName').val();
                  
                  console.log("you made a user with uid: " + userData.uid);
                  
                  window.confirm("New User Created with " + userData.uid);
                  
                  tryCreateNewUser(newUserName, userData); 

            }

        });
    
});


function  userCreated (newUserName, success) {

    if (!success) {

        alert('user' + newUserName + 'was not created');
        
        console.log(error)
    
    } else {

        alert('successfully created ' + newUserName);

    }

}

function tryCreateNewUser (newUserName, userData) {
    var allDetails = {
        email: $('#emailinput').val(),
        password: $('#mypassword').val(),
        userName: $('#userName').val()
    }

    var usersRef = new Firebase('rubbermatch.firebaseIO.com/users');
    var userUid = userData.uid;


    usersRef.child(userUid).transaction(function(currentUserData){

        if (currentUserData === null) 
          
            usersRef.child(userUid).set(allDetails);

        }, function(error, committed) {

            userCreated(error, newUserName, committed);

        });

}

