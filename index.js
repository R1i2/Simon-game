// Stores the different button colours used
var buttonColours=["red","blue","green","yellow"];
// for storing the game pattern
gamePattern=[];
// for storing the user click pattern
userClickedPattern=[];


var level=0;
var started=false;

// Game restart function
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}
// validating the user response
function checkAnswer(currentLevel)
{
   if(userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1])
   {
       console.log("correct");
   }
   else
   {
       $("body").addClass("game-over");
       var wrong=new Audio("sounds/wrong.mp3");
       wrong.play();
       startOver();
       setTimeout(function(){$("body").removeClass("game-over");},200);
       $("#level-title").text("Game Over, Press Enter Any Key to Restart");
   }
   if((userClickedPattern.length===gamePattern.length)&&started===true)
   {
    setTimeout(nextSequence,1000);
    userClickedPattern=[];
   }
}
// Playing sound for respective buttons
function playSound(name)
{
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}
// Adding animations
function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
        },100);
}
// nextSequence function which is the engine of this code
function nextSequence()
{
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level "+level);
    ++level;
}
//handles the click
$(".btn").click(function()
{
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
})
//Game starter code

/*
document.addEventListener("keydown",function(event)
{
    if(event.key==="Enter" && started===false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})
*/
$(document).on("keydown",function(event){
    if(event.key==="Enter" && started===false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})