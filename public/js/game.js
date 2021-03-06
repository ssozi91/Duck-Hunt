// Constructor function for a Game

function Game(difficulty) {
  this.lives = 3;
  this.score = 0;
  addSounds(this)
  var _this = this
  this.shotsLeft = 3
  this.concurrentDucksKilled = 0


  $(document).click(function() {
    _this.shot.play()
    _this.shotsLeft -= 1
    $($(".ammo")[_this.shotsLeft]).hide()
    $("#gunshotOverlay").css({'z-index': '10', 'opacity': '0.8'});
    $("#gunshotOverlay").animate({'z-index': '-10', 'opacity': '0'}, 70);
  })


  // Set the difficulty- easy by default
  if(typeof(difficulty) === "undefined") {
    this.speed = this.difficulty.easy;
  }
  else {
    console.log(this.difficulty[difficulty])
    this.speed = this.difficulty[difficulty];
  }

  // Kick-off the first wave of Ducks
  this.glados.play()
  setTimeout(function() {
    _this.nextRound();
  }, 2500)
}

function addSounds(g) {
  g.shot = new Audio("sounds/shot.mp3");
  g.tripleKill = new Audio("sounds/triple_kill.mp3")
  g.rampage = new Audio("sounds/rampage.mp3")
  g.glados = new Audio("sounds/prepare" + (Math.floor(Math.random()*(6-1+1)+1)) + ".mp3")
  g.godLike = new Audio("sounds/godlike.mp3")
  g.wicked = new Audio("sounds/wicked.mp3")
}

// Maps difficulty to speed at which a Duck traverses the screen in milliseconds.
Game.prototype.difficulty = {
  EASY: 8000,
  MEDIUM: 4000,
  HARD: 2500
}

// Fire off two new Ducks. After waiting a little while, continue to the next
// round if we've got more lives, or show the Game Over screen.

Game.prototype.nextRound = function() {
  new Duck(this);
  new Duck(this);
  this.shotsLeft = 3
  var _this = this;
  $('.ammo').show()

  // Do this again in a little while...
  var roundTimer = setTimeout(function() {
    // End the game if we've run out of lives
    if(_this.lives <= 0) {
      // Game over man
      _this.gameOver();
    }
    else {
      // Keep going!
      _this.nextRound();
    }
  }, this.speed);

}

// Show the Game Over modal and insert the player's score.
Game.prototype.gameOver = function() {
  $("#points").html(this.score);
  delete this // Doesn't work
  $("#game-over").show(200);
}

// Add the given number of points to the score, and print the total to the log.
Game.prototype.addScore = function(points) {
  this.score += points;
  $('#score').html(this.score);
}