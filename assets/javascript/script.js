$(document).ready(function () {
  //------------------Global Variables----------------//

  var playerOne = '<div id="player-one">1</div>';
  var compOne = '<div id="comp-one">C1</div>';
  var compTwo = '<div id="comp-two">C2</div>';
  var compThree = '<div id="comp-three">C3</div>';
  var turn = "";
  var path = "outer";

  var currFollow = 0;
  var currHappy = 0;
  var currMoney = 1;

  var currIncome = 1;

  //--------------------Turn Counter------------------//

  // $("#2>div, #5>div, #15>div, #18>div").html("Opportunity Arises").css({"writing-mode": "vertical-rl", "text-orientation": "mixed"});
  //   $("#8>div, #10>div, #21>div, #24>div").html("Opportunity Arises");

  //---------------------Element Rewrites------------//

  //---------------------Start Up--------------------//

  //   $(".reset").on("click", function () {
  //     location.reload();
  //   });

  function currTurn(x) {
    return $(".current-turn").text(x);
  }

  $("#1>div").append(compOne, compTwo, compThree);
  $("#1>div").append(playerOne);
  $(".roll-btn").attr("disabled", true);

  $("#skip-btn").click(function () {
    $("#rules").fadeOut("slow");
    setTurn();
  });

  $("#play-btn").click(function () {
    $("#rules-content").slideToggle("slow", function () {
      $("#players").slideToggle("slow").css("display", "flex");
    });
  });

  $("#go-btn").click(function () {
    $("#players").slideToggle("slow", function () {
      $("#formula").slideToggle("slow").css("display", "flex");
    });
  });

  $("#next-btn").click(function () {
    if (
      Number($(".fame").val()) +
        Number($(".happiness").val()) +
        Number($(".money").val()) !=
      60
    ) {
      $(".check-message").html("Your formula doesnt equal 60!");
    } else {
      $("#rules").fadeOut("slow");
      $(".heart").html("Happiness: " + $(".happiness").val());
      $(".star").html("Fame: " + $(".fame").val());
      $(".dollar").html("Money: " + $(".money").val());
    }
    setTimeout(() => {
      setTurn();
    }, 500);
  });

  $(".current-star").html("Fame: " + currFollow);
  $(".current-dollar").html("Money: £" + currMoney * 1000);
  $(".current-heart").html("Happiness: " + currHappy);

  $(".current-income").html("Income: £" + currIncome * 1000);

  //---------------------Opportunity Cards --------------------//

  oppCardArray = [
    [1, "Enrol", "Normal Reqs"],
    [2, "HTML", "Expenses Paid"],
    [3, "HTML", "Normal Reqs"],
    [4, "CSS", "Expenses Paid"],
    [5, "CSS", "Normal Reqs"],
    [6, "JavaScript", "Expenses Paid"],
    [7, "JavaScript", "Normal Reqs"],
    [8, "Holiday", "Yet unknown"],
  ];

  console.log(oppCardArray);

  playerOppCards = [];

  //---------Setting Turn-----------//

  function setTurn() {
    var r = Math.floor(Math.random() * 4 + 1);
    if (r == 1) {
      turn = "Player";
      currTurn("Player's turn now!");
      $(".roll-btn").removeAttr("disabled");
      playerOneTurn();
    } else if (r == 2) {
      turn = "Comp1";
      currTurn("Comp 1's turn now!");
      compOneTurn();
    } else if (r == 3) {
      turn = "Comp2";
      currTurn("Comp 2's turn now!");
      compTwoTurn();
    } else if (r == 4) {
      turn = "Comp3";
      currTurn("Comp 3's turn now!");
      compThreeTurn();
    }
  }

  //---------------------Board Space Effects----------//

  //---------------------Game Play--------------------//

  function playerOneTurn() {
    $(".player-turn-notice")
      .removeAttr("style")
      .animate({ left: "-=73%" }, 500)
      .delay(1000)
      .animate({ left: "-=100%" }, 500);

    $(".roll-btn").removeAttr("disabled");
    var currentSpace = $("#player-one").parent().parent().attr("id");

    if (currentSpace == 4) {
      $(".roll-btn").attr("disabled", true);
      $("#choose-enrol").slideToggle("slow").css("display", "flex");
      $(".enrol-no").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-enrol").fadeOut("slow");
      });
      $(".enrol-yes").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-enrol").fadeOut("slow");
        path = "inner-e";
      });
    }
    if (currentSpace == 11) {
      $(".roll-btn").attr("disabled", true);
      $("#choose-html").slideToggle("slow").css("display", "flex");
      $(".html-no").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-html").fadeOut("slow");
      });
      $(".html-yes").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-html").fadeOut("slow");
        path = "inner-h";
      });
    }
    if (currentSpace == 17) {
      $(".roll-btn").attr("disabled", true);
      $("#choose-css").slideToggle("slow").css("display", "flex");
      $(".css-no").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-css").fadeOut("slow");
      });
      $(".css-yes").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-css").fadeOut("slow");
        path = "inner-c";
      });
    }
    if (currentSpace == 23) {
      $(".roll-btn").attr("disabled", true);
      $("#choose-javascript").slideToggle("slow").css("display", "flex");
      $(".javascript-no").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-javascript").fadeOut("slow");
      });
      $(".javascript-yes").on("click", function () {
        $(".roll-btn").removeAttr("disabled");
        $("#choose-javascript").fadeOut("slow");
        path = "inner-j";
      });
    }
  }

  function compOneTurn() {
    var currentSpace = $("#comp-one").parent().parent().attr("id");
    if (currentSpace == 4) {
      $("#choose-enrol").slideToggle("slow").css("display", "flex");
      $(".enrol-no").on("click", function () {
        $("#choose-enrol").fadeOut("slow");
        $(".roll-btn").trigger("click");
      });
    } else {
      $(".roll-btn").trigger("click");
    }
  }

  function compTwoTurn() {
    var currentSpace = $("#comp-two").parent().parent().attr("id");
    if (currentSpace == 4) {
      $("#choose-enrol").slideToggle("slow").css("display", "flex");
      $(".enrol-no").on("click", function () {
        $("#choose-enrol").fadeOut("slow");
        $(".roll-btn").trigger("click");
      });
    } else {
      $(".roll-btn").trigger("click");
    }
  }

  function compThreeTurn() {
    var currentSpace = $("#comp-three").parent().parent().attr("id");
    if (currentSpace == 4) {
      $("#choose-enrol").slideToggle("slow").css("display", "flex");
      $(".enrol-no").on("click", function () {
        $("#choose-enrol").fadeOut("slow");
        $(".roll-btn").trigger("click");
      });
    } else {
      $(".roll-btn").trigger("click");
    }
  }

  // Rolling Dice so it affects correct player. Eventually this should be auto number rolling for the computers.

  $(".roll-btn").on("click", function () {
    if (turn == "Player") {
      var currentSpace = $("#player-one").parent().parent().attr("id");
      var diceRoll = Math.floor(Math.random() * 6) + 1;

      if (path == "inner-e" && currentSpace == 4) {
        currentSpace = $("#player-one").parent().parent().attr("id");
      } else if (path == "inner-e" && currentSpace != 4) {
        currentSpace = $("#player-one").parent().attr("id");
      } else if (path == "inner-e") {
        currentSpace = $("#player-one").parent().attr("id");
      }

      if (path == "inner-h" && currentSpace == 11) {
        currentSpace = $("#player-one").parent().parent().attr("id");
      } else if (path == "inner-h" && currentSpace != 11) {
        currentSpace = $("#player-one").parent().attr("id");
      } else if (path == "inner-h") {
        currentSpace = $("#player-one").parent().attr("id");
      }

      if (path == "inner-c" && currentSpace == 17) {
        currentSpace = $("#player-one").parent().parent().attr("id");
      } else if (path == "inner-c" && currentSpace != 17) {
        currentSpace = $("#player-one").parent().attr("id");
      } else if (path == "inner-c") {
        currentSpace = $("#player-one").parent().attr("id");
      }

      if (path == "inner-j" && currentSpace == 23) {
        currentSpace = $("#player-one").parent().parent().attr("id");
      } else if (path == "inner-j" && currentSpace != 23) {
        currentSpace = $("#player-one").parent().attr("id");
      } else if (path == "inner-j") {
        currentSpace = $("#player-one").parent().attr("id");
      }
      console.log(playerOppCards);
      console.log(currentSpace);
      var nextSpace = Number(currentSpace) + Number(diceRoll);

      $("#die-one").html(diceRoll);

      console.log(nextSpace);

      if (path == "outer") {
        if (nextSpace > 24) {
          nextSpace = nextSpace - 24;
        }
        $("#player-one").remove();
        $("#" + nextSpace + ">div").append(playerOne);
      } else if (path == "inner-e" && currentSpace == 4) {
        nextSpace = nextSpace + 20;
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-e" && nextSpace <= 35) {
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-e" && nextSpace > 35) {
        nextSpace = nextSpace - 31;
        $("#player-one").remove();
        $("#" + nextSpace + ">div").append(playerOne);
        path = "outer";
      } else if (path == "inner-h" && currentSpace == 11) {
        nextSpace = nextSpace + 24;
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-h" && nextSpace <= 43) {
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-h" && nextSpace > 43) {
        nextSpace = nextSpace - 29;
        $("#player-one").remove();
        $("#" + nextSpace + ">div").append(playerOne);
        path = "outer";
      } else if (path == "inner-c" && currentSpace == 17) {
        nextSpace = nextSpace + 26;
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-c" && nextSpace <= 50) {
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-c" && nextSpace > 50) {
        nextSpace = nextSpace - 30;
        $("#player-one").remove();
        $("#" + nextSpace + ">div").append(playerOne);
        path = "outer";
      } else if (path == "inner-j" && currentSpace == 23) {
        nextSpace = nextSpace + 27;
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-j" && nextSpace <= 59) {
        $("#player-one").remove();
        $("#" + nextSpace).append(playerOne);
      } else if (path == "inner-j" && nextSpace > 59) {
        nextSpace = nextSpace - 58;
        $("#player-one").remove();
        $("#" + nextSpace + ">div").append(playerOne);
        path = "outer";
      }
      if (
        nextSpace == 2 ||
        nextSpace == 5 ||
        nextSpace == 8 ||
        nextSpace == 10 ||
        nextSpace == 15 ||
        nextSpace == 18 ||
        nextSpace == 21 ||
        nextSpace == 24
      ) {
        var randomOpp = Math.floor(Math.random() * oppCardArray.length);
        playerOppCards.push(oppCardArray[randomOpp]);
        console.log(randomOpp);
        $(".opp-cards").append(
          `<div class="player-opp-card${playerOppCards[0][0]}">Testing</div>`
        );
      }

      if (
        nextSpace == 3 ||
        nextSpace == 6 ||
        nextSpace == 12 ||
        nextSpace == 16 ||
        nextSpace == 20 ||
        nextSpace == 22
      ) {
        currMoney = currMoney * 0.9;
        $(".current-dollar").html("Money: " + currMoney * 1000);
        console.log(currMoney);
      }

      if (nextSpace == 9) {
        currMoney = currMoney * 0.75;
        $(".current-dollar").html("Money: " + currMoney * 1000);
      }

      if (nextSpace == 14) {
        currMoney = currMoney - currIncome * 0.5;
        $(".current-dollar").html("Money: " + currMoney * 1000);
      }
      // Actions for Enroll section of board spaces
      if (
        nextSpace == 25 ||
        nextSpace == 27 ||
        nextSpace == 28 ||
        nextSpace == 30 ||
        nextSpace == 33 ||
        nextSpace == 35
      ) {
        currFollow = currFollow + 1;
        $(".current-star").html("Fame: " + currFollow);
      }

      if (nextSpace == 26) {
        currHappy = currHappy + 2;
        $(".current-heart").html("Happiness: " + currHappy);
      }

      if (nextSpace == 29) {
        currHappy = currHappy + 4;
        $(".current-heart").html("Happiness: " + currHappy);
      }

      if (nextSpace == 31) {
        currIncome = currIncome + 0.5;
        //   Need to display income somewhere!
        console.log(currIncome);
      }

      if (nextSpace == 32) {
        currMoney = currMoney * 0.5;
        $(".current-dollar").html("Money: " + currMoney * 1000);
      }

      if (nextSpace == 34) {
        currHappy = currHappy + 2;
        $(".current-heart").html("Happiness: " + currHappy);
      }

      // Actions for HTML section of board spaces

      if (
        nextSpace == 36 ||
        nextSpace == 39 ||
        nextSpace == 40 ||
        nextSpace == 41 ||
        nextSpace == 43
      ) {
        currFollow = currFollow + 1;
        $(".current-star").html("Fame: " + currFollow);
      }

      if (nextSpace == 37) {
        currHappy = currHappy + 3;
        $(".current-heart").html("Happiness: " + currHappy);
      }

      if (nextSpace == 38) {
        currHappy = Math.ceil(currHappy * 0.5);
        $(".current-heart").html("Happiness: " + currHappy);
      }

      if (nextSpace == 42) {
        currHappy = currHappy + 2;
        $(".current-heart").html("Happiness: " + currHappy);
      }

      // Actions for CSS section of board spaces

      if (
        nextSpace == 44 ||
        nextSpace == 45 ||
        nextSpace == 48 ||
        nextSpace == 49
      ) {
        currFollow = currFollow + 1;
        $(".current-star").html("Fame: " + currFollow);
      }

      if (nextSpace == 46) {
        currFollow = currFollow + 3;
        currIncome = currIncome + 1;
        $(".current-star").html("Fame: " + currFollow);
        //   Need to display income somewhere!
      }

      if (nextSpace == 47) {
        currFollow = currFollow + 3;
        $(".current-star").html("Fame: " + currFollow);
      }

      if (nextSpace == 50) {
        currFollow = currFollow + 2;
        currHappy = currHappy + 5;
        $(".current-star").html("Fame: " + currFollow);
        $(".current-heart").html("Happiness: " + currHappy);
      }

      // Actions for JavaScript section of board Spaces

      if (
        nextSpace == 51 ||
        nextSpace == 53 ||
        nextSpace == 55 ||
        nextSpace == 56 ||
        nextSpace == 59
      ) {
        currFollow = currFollow + 1;
        $(".current-star").html("Fame: " + currFollow);
      }

      if (nextSpace == 52) {
        currFollow = currFollow + 2;
        currHappy = currHappy + 4;
        $(".current-star").html("Fame: " + currFollow);
        $(".current-heart").html("Happiness: " + currHappy);
      }

      if (nextSpace == 54) {
          currFollow = currFollow + 4;
        currIncome = currIncome + 1;
        $(".current-star").html("Fame: " + currFollow);
        //   Need to display income somewhere!
      }

      if (nextSpace == 57) {
          currMoney = currMoney + 10;
        $(".current-dollar").html("Money: " + currMoney * 1000);
      }

      if (nextSpace == 58) {
          currFollow = currFollow + 4;
        $(".current-star").html("Fame: " + currFollow);
      }

      setTimeout(() => {
        turn = "Comp1";
        currTurn("Comp 1's turn now!");
        compOneTurn();
      }, 2000);
      $(".roll-btn").attr("disabled", true);
    } else if (turn == "Comp1") {
      var diceRoll = Math.floor(Math.random() * 6) + 1;
      // use .this instead of the player and create an array of the players!
      var currentSpace = $("#comp-one").parent().parent().attr("id");
      var nextSpace = Number(currentSpace) + Number(diceRoll);

      $("#die-one").html(diceRoll);
      if (nextSpace > 24) {
        nextSpace = nextSpace - 24;
      }
      $("#comp-one").remove();
      setTimeout(() => {
        $("#" + nextSpace + ">div").append(compOne);
      }, 300);
      setTimeout(() => {
        turn = "Comp2";
        currTurn("Comp 2's turn now!");
        compTwoTurn();
      }, 2000);
    } else if (turn == "Comp2") {
      var diceRoll = Math.floor(Math.random() * 6) + 1;
      // use .this instead of the player and create an array of the players!
      var currentSpace = $("#comp-two").parent().parent().attr("id");
      var nextSpace = Number(currentSpace) + Number(diceRoll);

      $("#die-one").html(diceRoll);
      if (nextSpace > 24) {
        nextSpace = nextSpace - 24;
      }
      $("#comp-two").remove();
      setTimeout(() => {
        $("#" + nextSpace + ">div").append(compTwo);
      }, 300);
      setTimeout(() => {
        turn = "Comp3";
        currTurn("Comp 3's turn now!");
        compThreeTurn();
      }, 2000);
    } else if (turn == "Comp3") {
      var diceRoll = Math.floor(Math.random() * 6) + 1;
      // use .this instead of the player and create an array of the players!
      var currentSpace = $("#comp-three").parent().parent().attr("id");
      var nextSpace = Number(currentSpace) + Number(diceRoll);

      $("#die-one").html(diceRoll);
      if (nextSpace > 24) {
        nextSpace = nextSpace - 24;
      }
      $("#comp-three").remove();
      setTimeout(() => {
        $("#" + nextSpace + ">div").append(compThree);
      }, 300);
      setTimeout(() => {
        turn = "Player";
        currTurn("Players turn now!");
        playerOneTurn();
      }, 1000);
    }
  });
}); // keep this as it closes full statement
