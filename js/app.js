// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var canvasWidth = 505;
    this.x += this.speed * dt;

    if (this.x >= canvasWidth) {
        this.x = 0;
    }

    checkCollisions.call(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  };

Player.prototype.update = function () {
  // Check if the player wins
  if (this.y < 0) {
    this.x = 202.5;
    this.y = 375;
  }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed;
    }
    // prevent player from leaving canvas
    if (player.y > 375 ) {
        player.y = 375;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};


var checkCollisions = function() {
    if (player.y + 130 >= this.y + 90 &&
        player.y + 70 <= this.y + 135 &&
        player.x + 15 <= this.x + 85 &&
        player.x + 75 >= this.x + 10) {

        player.x = 202.5;
        player.y = 375;

    }
  };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202.5, 375, 30);

for (var i = 0; i < 3; i++) {
  // speed max is half the canvas width
  // y maximum is 235 so bugs don't move on grass and minimum
  // 50 so they don't move on water
  allEnemies.push(new Enemy(Math.random() * 185 + 50, Math.random() * 252.5));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
