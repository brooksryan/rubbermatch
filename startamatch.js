var ref = new Firebase("rubbermatch.firebaseIO.com/");
var usersRef = new Firebase("rubbermatch.firebaseIO.com/users");
var currentAuthData;
var gameRef = ref.child("games");
var currentGame;
var i = 0;
var userVals;
var currentUserInfo = null;
var w = "wins";
var l = "losses";


//Creates the currentUserInfo object
// has all value from user object in firebase

var currentUser = function (){

    if (currentUserInfo !== null) {
      return currentUserInfo;  
    } else {
      getThisUserInfo(currentAuthData);  
    }

}

function getThisUserInfo (currentAuthData){

    usersRef.on("value", getUserData);

};

function getUserData (snapshot) {

    var thisUserSnapshot = snapshot.child(currentAuthData.uid);
    var userSnapshot = thisUserSnapshot.val();
    console.log(userSnapshot);
    currentUserInfo =  userSnapshot; 
    currentUserInfo.userId = currentAuthData.uid;
    userProfile(currentUserInfo);

};


//updates attributes at a given Key

function updateLocationAttributes (thisRef, thisKey, theseAttributes) {

    thisRef.child(thisKey).update(theseAttributes);

}

function winLossUpdate (thisRef, thisChild, thisAttribute) {

    thisRef.child(thisChild).child(thisAttribute).transaction(function(currentWins){

        return currentWins+1;
    })
}

function updateUserAttributes (thisKey, theseAttributes) {

    usersRef.child(thisKey).update(theseAttributes);

}

function removeElement(element){
    $(element).remove();
}

function childChanged () {

    gameRef.on('child_changed', function(childSnapshot, prevChildKey){
        
        var thisSnapShot = childSnapshot.val();
        var elementIdSelector = ('#' + childSnapshot.key());

        if (thisSnapShot.completed == true) {

        removeElement(elementIdSelector);

        }
        
    })

}



// --------------------------------------------------------------//
//              FUNCTIONS FOR CREATING LIST OF USERS            //

function createUserList() {
    usersRef.on("child_added", function (childSnapshot, prevChildKey) {
   
        var Key = childSnapshot.key();
        var childData = childSnapshot.val();
        var usernameSnapShot = childData.userName;

        if (currentAuthData.uid != Key) {
            addUserToList(Key, usernameSnapShot,childData);
        }

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

//appends item for each usernameSnapShot Val found by "createUserList"

function addUserToList (key, usernameSnapShot, childData) {
    
    var userItemHTML = $('<button></button>');

    userItemHTML.attr('class', 'userNameButtons');

    userItemHTML.attr('id', key);

    userItemHTML.text(usernameSnapShot);

    userItemHTML.data({userName: usernameSnapShot, userKey: key});
    
    var userData = {userName: usernameSnapShot, userKey: key};

    var challengeeUserName = userItemHTML.data('userName');

    var challengeeUserId = userItemHTML.data('userKey');

    appendChildToElement(userItemHTML, ContainerElement)
  

    if (childData.available === false || childData.available == undefined) {

        userItemHTML.css({'background-color':'#9E9E9E'});

        userItemHTML.click(function() {

            alert(usernameSnapShot + ' is not available!');

        });

    }

    if (childData.available === true) {

        userItemHTML.click(function() {

            createNewGame (challengeeUserName, challengeeUserId);
            //addsCreatedGameToCurrentGames();

        });

    };

}

// Game challenge alert confirmation

function  createNewGame (challengeeUserName, challengeeUserId) {


    if (confirm('Would you like to challenge ' + challengeeUserName + ' to a match?')) {

        newGameCode(challengeeUserId);
   
    } 

}

// Changes Users in progress Status

function updateInProgressStatus (thisUser) {

    usersRef.child(thisUser).update({

        gameInProgress: true

    });
}

// Pushes new game data to "/games"

function newGameCode (challengeeUserId) {

    var thisNewGame = gameRef.push({

        createdBy: currentAuthData.uid,
        createdByUserName: currentUserInfo.userName,
        challengee: challengeeUserId,
        challengeeUserName:"",
        createdAt: Firebase.ServerValue.TIMESTAMP,
        winner: "",
        loser: "",
        completedBy: "",
        completed: false,
        validated: false,

    });

    currentGame = thisNewGame.key();

}

// --------------------------------------------------------------//
//           CURRENT AND OPEN GAMES SECTION                      //


//  ADDS NEW GAME BOX UNDER THE #CURRENT GAME DIV

function appendChildToElement(child, element) {

    element.append(child)
};

var newGameContainer = $('#currentGame')

// Finish game function

function completeGame (gameKey) {

    gameRef.child(gameKey).update({

        completed: true,

    })
}

// function for adding current/open games to top of chart

function addCurrentGame (gameKey,gameChildData, gameCreator, gameChallengee) {

    var thisGameDiv = $('<div></div>');

    thisGameDiv.attr('id', gameKey);

    var finishGamesButtonsDiv = $('<div></div>');

    var challengeeCard = $('<button></button>');
 
    challengeeCard.attr('class', 'userNameButtons');

    var thisGameCreator = gameCreator;

    var createdByGameCard = $('<button></button>');

    createdByGameCard.attr('class', 'userNameButtons');


    //usersRef.child(thisGameCreator).child(userName).on("value", function (gameCreatorUserNameSnapshot) {

    //debugger

       //return gameCreatorUserNameSnapshot.val();

    //});

    var gameCreatorUserName = gameChildData.createdBy;

    x = null;
    y = null;

    /*function setCardText (thisData, thisCard) {

         usersRef.child(thisData).child("userName").once("value", function(snapshot){

            z = snapshot.val();
            
            thisCard.text = (z + " Won?");
        
        });

    

    }
    */

    //setCardText (gameChallengee, challengeeCard);

   var getChallengeeUserName = function (thisChallengee) {
        usersRef.child(thisChallengee).child("userName").once("value", function(snapshot){
            z = snapshot.key();

            if (z==currentAuthData.uid) {
                
                x = "You"
            
            } else {
           
                x = snapshot.val();

            }   

        });

        challengeeCard.text(x + " Won?");

    }

     var getCreatedbyUserName = function (thisChallengee) {

        usersRef.child(thisChallengee).once("value", function(snapshot){
            z  = snapshot.key();

            debugger

            if (z==currentAuthData.uid) {
                
                y = "You"
                return y
            
            } else {
                
                y = snapshot.val();
                return y

            }   
        });

        createdByGameCard.text(y + " Won?");

        thisGameDiv.text(y + ' Challenged ' + x)
    }





    getChallengeeUserName (gameChallengee);
    getCreatedbyUserName (gameCreatorUserName);

    



    //addNewGameBox(newGameCard, newGameCard);

    appendChildToElement(thisGameDiv, newGameContainer);
    appendChildToElement(finishGamesButtonsDiv,thisGameDiv);
    appendChildToElement(challengeeCard, finishGamesButtonsDiv);
    appendChildToElement(createdByGameCard, finishGamesButtonsDiv);

    var winnerLoser = {

        winner:"",
        loser:"",
        completed: true,
        completedBy: currentAuthData.uid,

    };
    

    challengeeCard.click(function() {


        winnerLoser.winner = gameChildData.challengee;
        winnerLoser.loser =  gameChildData.createdBy;

        updateLocationAttributes(gameRef, gameKey, winnerLoser);
        winLossUpdate(usersRef,gameChildData.challengee, w);
        winLossUpdate(usersRef,gameChildData.createdBy, l);

    });

    createdByGameCard.click(function() {

        winnerLoser.winner = gameChildData.createdBy;
        winnerLoser.loser =  gameChildData.challengee;

    updateLocationAttributes(gameRef, gameKey, winnerLoser);
    winLossUpdate(usersRef,gameChildData.challengee, l);
    winLossUpdate(usersRef,gameChildData.createdBy, w);

    });


    
}

function createGamesList() {

    gameRef.on("child_added", function (childSnapshot, prevChildKey) {

            var gameKey = childSnapshot.key();
            var gameChildData = childSnapshot.val();
            var gameChallengee = gameChildData.challengee;
            var gameCreator = gameChildData.createdBy;
            //console.log(gameKey);
            //console.log(gameChildData);

            if ((currentAuthData.uid == gameCreator || currentAuthData.uid == gameChallengee) && gameChildData.completed === false) {
               
                addCurrentGame(gameKey, gameChildData, gameCreator, gameChallengee);

            }

    })

}


// --------------------------------------------------------------//

// AUTHENTICATION CODE //


function authenticator() {
    var userAvailable = {available: true};  
    ref.onAuth(function(authData) {
  
        if (authData) {
        
            currentAuthData = authData;
            console.log("Authenticated with uid:", authData);
            updateUserAttributes(authData.uid, userAvailable);
            
            checkUserWinLoss(currentAuthData.uid, gameRef, currentUser(), createGamesList(), createUserList());

        } else {

            console.log("Client unauthenticated.")
            //window.location = "/index.html"

        }
    
    });

};


function userProfile(currentUserInfo) {

    var thisPercentage = winPercentage(currentUserInfo.wins, currentUserInfo.losses);

    document.getElementById("welcome").textContent = (currentUserInfo.userName + " has " + currentUserInfo.wins + " wins and " + currentUserInfo.losses + " losses" + " and a current win % of " + thisPercentage);

}

function winPercentage (wins, losses) {
    var winLossPercentage = wins/(wins+losses);
    console.log("win loss percentage");
    return winLossPercentage;
}



// --------------------------------------------------------------//

$(document).ready(function () {
    
    authenticator();
    childChanged();
    
});

// --------------------------------------------------------------//

//CHECK WINS LOSSES FUNCTION



var wins = 0; 
var losses = 0;

function countUp (childsnapshot, authId) {
    var childData = childsnapshot.val();

    if (childData.winner == authId) {
        wins++
    }

    if (childData.loser == authId) {
        losses++
    }
}

function countWins (snapshot, authId) {
    snapshot.forEach(function(childSnapshot) {
        countUp(childSnapshot, authId);
    }); 
}

//Checks a designated firebaseRef and launches counWins function
//and passes the current authdata userid and snapshot

function checkUserWinLoss (authId, firebaseRef) {

        firebaseRef.once("value", function(snapshot) {

        countWins(snapshot, authId);

    });
}


// --------------------------------------------------------------//


function checkFirebaseForReference (firebaseReference, callbackFunction){

    firebaseReference.once("value", callbackFunction);

};


function getSnapShotData (snapshot, childToReference, variableForStoringChildData) {

    var a = snapshot.child(childToReference);
    var b = a.val();
    variableForStoringChildData =  b; 

};

$('#logmeout').click(function (){ 

    usersRef.child(currentAuthData.uid).update({
          
        available: false

    }, 

    logOutFunction());

});



function logOutFunction () {

    console.log('client unauthenticated');

    ref.unauth();

}

