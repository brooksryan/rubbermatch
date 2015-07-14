var ref = new Firebase("rubbermatch.firebaseIO.com/");
var usersRef = new Firebase("rubbermatch.firebaseIO.com/users");
var currentAuthData;
var gameRef = ref.child("games")
var currentGame;
var i = 0;

//fires Search for all users on pageload 

$(document).ready(function () {

    var welcomeMessage = document.getElementById('welcome');
    welcomeMessage.innerHTML = 'welcome to rubbermatch!';
    createGamesList();
    createUserList();
    authenticator();

});


// --------------------------------------------------------------//
//              FUNCTIONS FOR CREATING LIST OF USERS            //

function createUserList() {

    usersRef.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var Key = childSnapshot.key();
            var childData = childSnapshot.val();
            var usernameSnapShot = childData.userName;
            console.log(Key);
            console.log(childData);

            if (currentAuthData.uid != Key) {
                addUserToList(Key, usernameSnapShot,childData);
            }

        })  

    })

}

function newUserMonitor() {

    usersRef.on("value", function (key) {

        addUserToList(key);
    
    })

}

//Selects userlist div

var newUserList = document.querySelector('#userList')

var ContainerElement = $('#userList');


//  ADDS NEW USER ITEM BUTTON UNDER THE CURRENT USERS DIV
function addBoxId (key,userItemHTML) {

  ContainerElement.append(userItemHTML);
  
}

//appends li item for each usernameSnapShot Val found by "createUserList"

function addUserToList (key, usernameSnapShot, childData) {
    
    var userItemHTML = $('<button></button>');

    userItemHTML.attr('class', 'userNameButtons');

    userItemHTML.attr('id', key);

    userItemHTML.text(usernameSnapShot);

    userItemHTML.data({userName: usernameSnapShot, userKey: key});

    var challengeeUserName = userItemHTML.data('userName');

    var challengeeUserId = userItemHTML.data('userKey');

    addBoxId(key, userItemHTML);

    if (childData.available === false || childData.available == undefined) {

        userItemHTML.css({'background-color':'#9E9E9E'});

        userItemHTML.click(function() {

            alert(usernameSnapShot + ' is not available!');

        });

    }

    if (childData.available === true) {

        userItemHTML.click(function() {

            createNewGame (challengeeUserName, challengeeUserId);

        });

    };

}

function  createNewGame (challengeeUserName, challengeeUserId) {
    debugger

    if (confirm('Would you like to challenge ' + challengeeUserName + ' to a match?')) {

        newGameCode(challengeeUserId);
   
    } 

}

function newGameCode (challengeeUserId) {
debugger
    var thisNewGame = gameRef.push({

        createdBy: currentAuthData.uid,
        challengee: challengeeUserId,
        createdAt: Firebase.ServerValue.TIMESTAMP,
        winner: "",
        loser: "",
        completed: false,

    });

    currentGame = thisNewGame.key();

    usersRef.child(currentAuthData.uid).update({

        gameInProgress: true

    });

    usersRef.child(challengeeUserId).update({

        gameInProgress: true

    })



}


// --------------------------------------------------------------//
//           CURRENT AND OPEN GAMES SECTION                      //


//  ADDS NEW GAME BOX UNDER THE #CURRENT GAME DIV
function addNewGameBox (newGameCard) {

    newGameContainer.append(newGameCard);

}

var newGameContainer = $('#currentGame')

// function for adding current/open games to top of chart

function addCurrentGame (gameKey) {

    var newGameCard = $('<div></div>');

    newGameCard.attr('class', 'dialog');

    newGameCard.attr('id', gameKey);

    function checkData (gameKey) {

        gameRef.child(gameKey).once('value', function(snapshot){

            var data = snapshot.val()
        
        })

    }

    addNewGameBox(newGameCard);
    
}

function createGamesList() {

    gameRef.once("value", function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var gameKey = childSnapshot.key();
            var gameChildData = childSnapshot.val();
            var gameChallengee = gameChildData.challengee;
            var gameCreator = gameChildData.createdBy;
            console.log(gameKey);
            console.log(gameChildData);

            if (currentAuthData.uid == gameCreator && gameChildData.completed === false) {
                debugger
                addCurrentGame(gameKey);

            }

        })  

    })

}



// --------------------------------------------------------------//

// AUTHENTICATION CODE //

function authenticator() {
    ref.onAuth(function(authData) {
  
        if (authData) {
            
            currentAuthData = authData;
            console.log("Authenticated with uid:", authData);
            usersRef.child(authData.uid).update({
          
            available: true

            });

        } else {

            console.log("Client unauthenticated.")

        }
    
    });

};