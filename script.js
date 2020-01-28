var gamepattern=[];
var buttonColors=["red",'blue','green','yellow'];
var randomChosenColor;
var userClickedPattern = [];
var counter = -1;
var started = false;
var counter_reset = 0;
function nextSequence(){
    counter_reset=0;
    userClickedPattern = [];
    counter++;
    var level = "Уровень "+counter;
    $("h1").text(level);
    var randomNum = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNum];
    gamepattern.push(randomChosenColor);
    flash();
}
function flash(){
$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
let audio = new Audio("sounds/"+randomChosenColor+".mp3");
audio.play();
}
$("div.btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound($(this).attr('id'));
    animatePress($(this).attr('id'));
    if (!started) {
        userClickedPattern = [];
        started = true;
      }
      checkAnswer(counter);
      
});
function playSound(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){$("#"+color).removeClass("pressed");},100);
}
function checkAnswer(curentLevel){
if(userClickedPattern[curentLevel]===gamepattern[curentLevel]){
    setTimeout(function () {nextSequence();  },600);
}
if(userClickedPattern[counter_reset]!==gamepattern[counter_reset]&&started===true){
    startOver();
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over"); },200);
    $("h1").text("Игра окнчена, нажмите любую кнопку что бы начать заново!")
}else{
    counter_reset++;
}
}
function startOver(){
started = false;
counter_reset = 0;
counter=-1;
gamepattern = [];
userClickedPattern = [];
}