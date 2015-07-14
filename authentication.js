  var tokenPayload;
  var available;
  var ref = new Firebase('rubbermatch.firebaseIO.com');
    $(document).ready(function authenticator() {
      function authenticator() {
    ref.onAuth(function(authData) {
  
        if (authData) {
            
            thisAuthData = authData;
            console.log("Authenticated with uid:", thisAuthData);
            usersRef.child(authData.uid).update({
          
            shirt: true

            });

        } else {

            console.log("Client unauthenticated.")

        }
    
    });

};
  });