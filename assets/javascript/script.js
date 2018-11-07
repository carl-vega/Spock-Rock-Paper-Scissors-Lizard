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
  var sidenavElement = document.querySelectorAll(".sidenav");
  var sidenav = M.Sidenav.init(sidenavElement)[0];

  function gameChanged(snapshot) {
    var players = snapshot.val();
    var user = localStorage.getItem("name");

    if (!players) {
      return;
    }
    var usernames = Object.keys(players);
    if (usernames.length === 1 && usernames[0] === user) {
      var choice = snapshot.val()[user].choice;
      $("#info").text("You chose " + choice + ". Waiting for another player.");
    }
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
    $("#alerts").removeClass("hide");
    $("#info").text(username + ", throw a gesture");
    database.ref("players/" + username).set(null);
    $(window).trigger("resize");
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
    $("#info").text("It is a draw");
  }

  function declareWinner(winner, loser) {
    $("#info").text(
      winner.choice + " beats " + loser.choice + ". " + winner.name + " wins"
    );
  }

  function option(event) {
    var choice = $(this).attr("data-choice");
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
    document.getElementById("yackity").val("");
  }

  function onlineChat(snapshot) {
    var chatHistory = snapshot.val();
    var chatDiv = $("<li>");
    chatDiv.attr("id", snapshot.key);
    chatDiv.text(chatHistory);
    $("#schmackity").append(chatDiv);
    document.getElementById(snapshot.key).scrollIntoView();

    if (!sidenav.isOpen) {
      M.toast({ html: chatHistory });
    }

    $(".reset")
      .closest("form")
      .find("input[type=text], text")
      .val("");
  }

  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
  });

  $("img[usemap]").rwdImageMaps();

  $("#slide-out").on("submit", inlineChat);

  $("map area").on("click", option);

  database.ref("players").on("value", gameChanged);

  database
    .ref("messages")
    .limitToLast(1)
    .on("child_added", onlineChat);

  $("#username")
    .val(localStorage.getItem("name"))
    .focus();

  $(window).on("beforeunload", function() {
    database.ref("messages").set({});
  });
});
