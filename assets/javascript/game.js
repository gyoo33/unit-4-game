$(document).ready(function() {

// Global Variables

    var images = ['assets/images/french-bulldog.jpg', 'assets/images/maltipoo.jpg', 'assets/images/papillon.jpg', 'assets/images/yorkie.jpg'];
    var counter = 0;
    var wins = 0;
    var losses = 0;

// Functions

    function randomTargetNumber () {
// at the start of every game, there's a randomly generated number, which has a value between 19 - 120
        targetNumber = Math.round(Math.random() * 102) + 19;
        $("#randomNumber").text(targetNumber);
        //console.log(targetNumber);
    }

    function resetCrystals () {
// there are 4 crystals and each have a different randomly generated number, which are hidden from the user, and values should be between 1 - 12
// only way to find out how much a crystal is worth is to click on it
        for (var i=0; i<images.length; i++) {
            var imageCrystal = $("<img>");
            imageCrystal.addClass("crystalImage");
            imageCrystal.attr("src", images[i]);
            imageCrystal.attr("value", Math.floor((Math.random() * 12) + 1));
            $("#crystals").append(imageCrystal);
        }
    }

    function startGame () {
    // each time you click on a crystal, user will add the amount of points the crystal is worth to the total score
        $(".crystalImage").on("click", function() {
            crystalValue = ($(this).attr("value"));
            crystalValue = parseInt(crystalValue);
            counter += crystalValue;
            //console.log(counter);
            $('#userScore').text(counter);
            //alert("you're new score is " + counter);

    // goal is to match user's total score to the random number
    // if user's total score is less than random number, then user keeps playing
    // if user's total score matches random number, then user is alerted they won (in wins/loss counter div) and counter for wins will increment by 1, and random number resets automatically, and total score is reset to 0, crystal values also resets automatically to a new random number
            if (counter == targetNumber) {
                wins++;
                $('#win').text(wins);
                resetGame();
                resetCrystals();
                startGame();
                alert("You won " + wins + " times!");
            }

    // if user's total score is greater than random number, then user is alerted they lost in wins/loss counter div) and counter for losses will increment by 1, and random number resets automatically, and total score is reset to 0, crystal values also resets automatically to a new random number
            else if (counter > targetNumber) {
                losses++;
                $('#loss').text(losses);
                resetGame();
                resetCrystals();
                startGame();
                alert("Sorry! Try again!");
            }
        });
    }

    function resetGame() {
        counter = 0;
        randomTargetNumber();
        $("#userScore").text(0);
        $("#crystals").empty();   
    }

    randomTargetNumber();
    resetCrystals();
    startGame();
    
});