 
// logs in user

var ref = new Firebase('rubbermatch.firebaseIO.com');
var name = $('#emailinput').val();
var thispassword = $('#mypassword').val();
var logoutCurrentUser = ref.unauth
var authData = authData
  
$('#exisinguser').click(function firebaseAuthentication(){
    ref.authWithPassword({
        // email input 
        email: $('#emailinput').val(),
        // password input 
        password: $('#mypassword').val()
      
    }, function(error, authData) {
        if (error) {
            console.log("login failed", error);

        } else {

            console.log("Authenticated successfully with payload:" + authData);
            window.confirm("login successful! Welcome " + authData.uid);
            
        }

    $('#emailinput').val('');
    $('#mypassword').val('');

    })

});

// log out user 

$('#logmeout').click(function logoutAndSetStatusAway(authData){ 
    ref.child("users").child(currentUser.uid).update({
    shirt: false });
});
      /* if (shirt = false) {
        
        logoutCurrentUser

      } 
      );*/
