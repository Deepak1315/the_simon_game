buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    // Adding sound
    playSound(userChosenColor);

    // Adding Animation
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];

    var randomNumber =  Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Adding Animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // Adding sound
    playSound(randomChosenColor);

}

// Function for playing sound
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// Function for animation
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1000);
        }
    } else {
        wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}