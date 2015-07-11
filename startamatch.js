
var ref = new Firebase("rubbermatch.firebaseIO.com/")
var usersRef = new Firebase("rubbermatch.firebaseIO.com/users")


/*$('#updateInfo').click(function(){
  ref.onAuth(function(authData) {
   //if (authData) {
      //update User Company & Username
     
      ref.child("games").push({
        
        Username: authData.uid,
        Company: $('#companyName').val()
    
        });
     // }
    })
  });
*/



$(document).ready(function(){

  createUserList();

  //newUserMonitor();
});

function createUserList () {

  usersRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key();
      var childData = childSnapshot.val();
      var usernameSnapShot = childData.userName;
      debugger
      console.log(key);
      console.log(childData);
      addUserToList(key, usernameSnapShot);
    })
  })
}

function newUserMonitor () {

  usersRef.on("value", function(key){
   
    addUserToList(key);
  })

}

//Selects userlist div
var newUserList = document.querySelector('#userList')

//appends li item for each usernameSnapShot Val found by "createUserList"
var addUserToList = function (key, usernameSnapShot) {

      var li = document.createElement('li');
      li.innerHTML = usernameSnapShot;
      debugger
      newUserList.appendChild(li);

}