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

  function gameChanged(snapshot) {
    var players = snapshot.val();
    if (!players) {
      return;
    }
    var usernames = Object.keys(players);
    if (usernames.length >= 2) {
      determineWinner(players[usernames[0]], players[usernames[1]]);
      database.ref("players").set({});
    }
  }

  $("#name").on("submit", function(event) {
    event.preventDefault();
    var username = $("#username")
      .val()
      .trim();
    localStorage.setItem("name", username);
    $("#name").addClass("hide");
    $("#buttons").removeClass("hide");
    $("#player").text(username + ", throw a gesture");
    database.ref("players/" + username).set(null);
  });

  function determineWinner(playerA, playerB) {
    if (playerA.choice === playerB.choice) {
      return draw();
    }
    var gestures = {
      Rock: ["Scissors", "Lizard"],
      Paper: ["Rock", "Spock"],
      Scissors: ["Lizard", "Paper"],
      Spock: ["Scissors", "Rock"],
      Lizard: ["Spock", "Paper"]
    };
    var playerAWon = gestures[playerA.choice].indexOf(playerB.choice) > -1;
    if (playerAWon) {
      declareWinner(playerA, playerB);
    } else {
      declareWinner(playerB, playerA);
    }
  }

  function draw() {
    $("#winner").text("It is a draw");
    $("#info").empty();
    $("button").removeClass("indigo");
  }

  function declareWinner(winner, loser) {
    $("#winner").text(
      winner.choice + " beats " + loser.choice + ". " + winner.name + " wins"
    );
    $("#info").empty();
    $("button").removeClass("indigo");
  }

  function option(event) {
    var choice = $(this).attr("data-choice");
    $(this).addClass("indigo");
    $("#info").text("you chose " + choice);
    $("#winner").empty();
    database.ref("players/" + localStorage.getItem("name")).set({
      name: localStorage.getItem("name"),
      choice: choice
    });
  }
  function inlineChat(event) {
    event.preventDefault();
    var message = $("#yackity").val();
    var name = localStorage.getItem("name");
    database.ref("messages").push(name + " - " + message);
  }

  function onlineChat(snapshot) {
    setTimeout(function() {
      document.getElementById("#" + snapshot.key + "").scrollIntoView();
    });
    var chatHistory = snapshot.val();
    var chatDiv = $("<li>");
    chatDiv.attr("id", snapshot.key);
    chatDiv.text(chatHistory);
    $("#schmackity").append(chatDiv);
  }

  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
  });

  $(document).ready(function() {
    $(".sidenav").sidenav();
  });

  $("#slide-out").on("submit", inlineChat);

  $("map area").on("click", option);

  database.ref("players").on("value", gameChanged);

  database.ref("messages").on("child_added", onlineChat);

  $("#username")
    .val(localStorage.getItem("name"))
    .focus();
});
