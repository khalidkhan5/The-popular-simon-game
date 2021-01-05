//all the variables and array used in this game
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level=0;
var started=false;

// Game will start after pressing
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});
// click the pattern that is present at that level
$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
// it will choose new random box 
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  level++;
  $("#level-title").text("Level "+level);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// all the logic of comparing and checking is here
function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern.length=0;
    }
 }else{
   console.log("wrong");
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);
   $("h1").text("Game Over! Please Restart the Game");
   startOver();
 }
}
// game will Restart again
function startOver(){
  level=0;
  userClickedPattern.length=0;
  gamePattern.length=0;
  started=false;
}
// It will howver at the box that clicked
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
// sound of these boxes
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
