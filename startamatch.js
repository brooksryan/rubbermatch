var ref = new Firebase("rubbermatch.firebaseIO.com/");
var usersRef = new Firebase("rubbermatch.firebaseIO.com/users");
var thisAuthData;
var gameRef = ref.child("games")

//fires Search for all users on pageload 

$(document).ready(function () {

    var welcomeMessage = document.getElementById('welcome');
    welcomeMessage.innerHTML = 'welcome to rubbermatch!';
    createUserList();
    authenticator();

});

function createUserList() {

    usersRef.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var Key = childSnapshot.key();
            var childData = childSnapshot.val();
            var usernameSnapShot = childData.userName;
            console.log(Key);
            console.log(childData);
            addUserToList(Key, usernameSnapShot,childData);

        })  

    })

}

function newUserMonitor() {

    usersRef.on("value", function (key) {

        addUserToList(key);
    
    })

}

function addBoxId (key,userItemHTML) {

  ContainerElement.append(userItemHTML);
  
}


//Selects userlist div

var newUserList = document.querySelector('#userList')

var ContainerElement = $('#userList');

//appends li item for each usernameSnapShot Val found by "createUserList"

function addUserToList (key, usernameSnapShot, childData) {
    
    var userItemHTML = $('<button></button>');

    userItemHTML.attr('class', 'userNameButtons');

    userItemHTML.text(usernameSnapShot);

    userItemHTML.data({userName: usernameSnapShot, userKey: key});

    userItemHTML.attr('id', key);

    var thisNewData = userItemHTML.data('userName');

    addBoxId(key, userItemHTML);

    if (childData.available === false || childData.available == undefined) {

        userItemHTML.css({'background-color':'#9E9E9E'});

        userItemHTML.click(function() {

            alert(usernameSnapShot + 'is not available!');

        });

    }

    if (childData.available === true) {

        userItemHTML.click(function() {

            createNewGame (usernameSnapShot,thisNewData);

        });

    };

}

function  createNewGame (usernameSnapShot, thisNewData) {

    if (confirm(usernameSnapShot + ', would you like to challenge ' + thisNewData + ' to a match?')) {

        newGameCode(thisNewData);
   
    } 

}

function newGameCode (thisNewData) {

    gameRef.push({

        createdBy: thisAuthData.uid,
        Challengee: thisNewData,

    });

}

// AUTHENTICATION CODE

function authenticator() {
    ref.onAuth(function(authData) {
  
        if (authData) {
            
            thisAuthData = authData;
            console.log("Authenticated with uid:", authData);
            usersRef.child(authData.uid).update({
          
            available: true

            });

        } else {

            console.log("Client unauthenticated.")

        }
    
    });

};


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