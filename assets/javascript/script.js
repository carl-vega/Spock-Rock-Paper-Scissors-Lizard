$(document).ready(function() {
  // firebase key
  var config = {
    apiKey: "AIzaSyD-JoDClBpzGPFQXCLMUq-YvkQRTDd8JW0",
    authDomain: "rockpaperscissorsspockli-5a0b5.firebaseapp.com",
    databaseURL: "https://rockpaperscissorsspockli-5a0b5.firebaseio.com",
    projectId: "rockpaperscissorsspockli-5a0b5",
    storageBucket: "rockpaperscissorsspockli-5a0b5.appspot.com",
    messagingSenderId: "857001278813"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var playerA;
  var playerB;

  database.ref("/players").on("value", function(snapshot) {
    if (snapshot.child("playerA").exists()) {
      database.ref("/players").set({
        playerB: playerB
      });
      $("#modal").removeClass("modal open");
    }
  });

  function start() {
    var modCont = $("<div>");
    var modHead = $("<h4>");
    var modText = $("<p>");
    var modFoot = $("<a>");

    modFoot.addClass("modal-footer").text("waiting...");
    modText.text(
      "While you wait for the other player, the rules of this game are as follows. Rock beats scissors and lizard. Paper beats rock and Spock. Scissors beats paper and lizard. Spock beats rock and scissors. Lizard beats paper and Spock."
    );
    modHead.text("You are Player 1");
    modCont.addClass("modal-content").append(modHead, modText, modFoot);

    $("#modal")
      .addClass("modal open")
      .append(modCont);
  }

  function matchNum() {
    var count = 0;
    count++;
    $("#num-games").text(count);
  }

  // function option() {

  // }

  // function playerA() {

  // }

  //   function restart() {}

  var elem = document.querySelector(".collapsible.popout");
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });

  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
  });

  $("#minus").on("click", matchNum);
  $("#plus").on("click", matchNum);

  start();
});
