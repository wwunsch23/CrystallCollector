function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
    var gameStart = {
        currentSum: 0,
        targetRandNumber: getRandomNumber(19, 120),
    }
    return gameStart;
}

function setJewelValue (item) {
    item.attr("data-crystalvalue", getRandomNumber(1,12));
}

function userTotal (gameStart, sum){
    gameStart.currentSum += sum;
    return gameStart.currentSum;
}

function animateImage (item, index, arr) {
    arr[0].css({"position":"absolute","top":"12rem","left":"2rem"});
    arr[1].css({"position":"absolute","top":"12rem","left":"15rem"});
    arr[2].css({"position":"absolute","top":"12rem","right":"15rem"});
    arr[3].css({"position":"absolute","top":"12rem","right":"2rem"});
    $(".crystal-image").animate({
        height: '+=300px',
        width: '+=300px'
    },"slow");
    $(".crystal-image").animate({
        height: '-=300px',
        width: '-=300px'
    },"slow");
}

function resetPosition (item, index, arr) {
    //item.css("position","static");
    //item.removeAttr("style");
    // arr[1].css("position","static");
    // arr[2].css("position","static");
    // arr[3].css("position","static");
}

function newGame () {
    gameStart = startGame();
    $("#target-Num").text(gameStart.targetRandNumber);
    $("#current-Sum").text(gameStart.currentSum);
    jewels.forEach(setJewelValue);
    return gameStart;
}

$(document).ready(function () {

    var wins = 0;
    var losses = 0;

    var winsItem = $("#wins").text(wins);
    var lossItem = $("#losses").text(losses); 

    var blue = $("#blue");
    var green = $("#green");
    var purple = $("#purple");
    var red = $("#red");

    jewels = [blue,green,purple,red];
    jewels.forEach(setJewelValue);

    var gameStart = startGame();
    $("#target-Num").text(gameStart.targetRandNumber);
    $("#current-Sum").text(gameStart.currentSum);

  
    $(".crystal-image").on("click", function() {
        crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        $("#current-Sum").text(userTotal(gameStart, crystalValue));
  
  
        if (gameStart.currentSum === gameStart.targetRandNumber) {
            alert("You win!");
            jewels.forEach(animateImage);
            $(".crystal-image").css("position","static");
            //jewels.forEach(resetPosition);
            wins++;
            winsItem.text(wins);
            gameStart = newGame();
        } else if (gameStart.currentSum >= gameStart.targetRandNumber) {
            alert("You lose!!");
            losses++;
            lossItem.text(losses);
            gameStart = newGame();
        }
    });
});   