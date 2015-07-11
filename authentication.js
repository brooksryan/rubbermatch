  var tokenPayload;
  var available;
  var ref = new Firebase('rubbermatch.firebaseIO.com');
    $(document).ready(function authenticator() {
      ref.onAuth(function(authData) {
       /* if (authData && isNewUser) {

        //save the user's profile if they're a new user into firebase
        //use them in Security & Firebase rules

        ref.child("users").child(authData.uid).set({
        
         provider: authData.provider,
         name: $('#emailinput').val(),
         Username: $('#userName').val(),
         Company: $('#companyName').val()

         })
        } */

      if (authData) {
        available = true;
        tokenPayload = authData;
        console.log("Authenticated with uid:", tokenPayload);
       

       $('input.inputsfade').fadeOut(1500).addClass('hidden');

      
      } else {
        available = false
        console.log("Client unauthenticated.")
        $('input.inputsfade').fadeIn(1500).removeClass('hidden');
      }
    });
  });