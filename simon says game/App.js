var colors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;


$(window).keypress(function(){
    if(!gameStarted){
        nextSequence();
        gameStarted = true;
    }
})




function nextSequence(){
    userClickedPattern = []
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColor = colors[randomNumber]
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(350).fadeIn(350);
    playSound(randomChosenColor)
}


$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1)
})

$("#"+gamePattern[0]).fadeOut(250).fadeIn(250);


function playSound(sound) {
    var audio = new Audio("sounds/"+sound+".mp3")
    audio.play()
}

function animatePress(color) {

    $("#"+color).addClass("pressed")
    setTimeout(function() {
        $("#"+color).removeClass("pressed");    
    },150)

    



}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){nextSequence()}, 1000)
        }
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){$("body").removeClass("game-over")},200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    

}



function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;

}





