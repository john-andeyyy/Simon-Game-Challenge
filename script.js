
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === 'a' && !started) {
      document.getElementById("level-title").textContent = "Level " + level;
      nextSequence();
      started = true;
    }
  });
  
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
      let userChosenColor = this.id;
      //console.log(this.id)
      userClickedPattern.push(userChosenColor);
  
      playSound(userChosenColor);
      animatePress(userChosenColor);

      console.log(userClickedPattern.length - 1)

      checkAnswer(userClickedPattern.length -1);
    });
  });
  
  function checkAnswer(currentLevel) {
    console.log(currentLevel)
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      document.body.classList.add("game-over");
      document.getElementById("level-title").textContent = "Game Over, Press 'A' to Restart";
  
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 200);
  
      startOver();
    }
  }
  
  function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;
  
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  
    for (let i = 0; i < gamePattern.length; i++) {
      setTimeout(() => {
        playSound(gamePattern[i]);
        animatePress(gamePattern[i]);
      }, 500 * i); // Delay each step by 500 milliseconds
    }
  }
  
  
  function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  function animatePress(currentColor) {
    let button = document.getElementById(currentColor);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 100);
  }
  
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  