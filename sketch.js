let totalSeconds = 0;
let counter = setInterval(timer, 1000);

let myPlayer;
let myAlien;
let myLifebar
let aliens = [];
let timeLastAdded = 0;
let timeLastAdded1 = 0;

let newSpeed = 1
let newDamage = 1

function preload() {

}

function setup() {
  createCanvas(300, 300);

  let newAlien = new Alien(0, random(height), 30, 0, 2);
  aliens.push(newAlien); // add my new alien to the array
  print(aliens);

  myPlayer = new Player(width / 2,
    height - 0,
    20,
    color);

  myLifebar = new
  Lifebar(width, (0, height), 20)
}

function draw() {
  noStroke();
  fill(255)
  rect(0, 0, 300, 300)


  if (totalSeconds > 0) {
    noStroke();
    fill(0);
    textSize(10);
    text(totalSeconds, width - 40, height - (height - 20));
  }

  // add a new alien every 10 seconds
  if (millis() - timeLastAdded > 10000) {
    // add another alien
    let newAlien = new Alien(0, random(height), 30, 0, 2);
    aliens.push(newAlien); // add my new alien to the array
    // print(aliens);
    timeLastAdded = millis()
    newSpeed = newSpeed + 0.25;

  }

  if (millis() - timeLastAdded1 > 20000) {
    
     timeLastAdded1 = millis()
    newDamage = newDamage + 1
    print(newDamage);

  }

  // move the aliens
  for (let i = 0; i < aliens.length; i++) {
    aliens[i].move();

  }

  handleKeyboard();

  // loop over aliens and check if they collided
  for (let g = 0; g < aliens.length; g++) {

    if (myLifebar.damage(aliens[g].x, aliens[g].y, aliens[g].r)) {
      aliens.splice(g, 1);
    }
  

    if (myPlayer.collide(aliens[g].x, aliens[g].y, aliens[g].r) &&
      mouseIsPressed) {
      // delete this circle
      aliens.splice(g, 1);
    } else {
      aliens[g].display();
    }



  }

  myPlayer.display();
  myLifebar.display();

}


function timer() {
  totalSeconds = totalSeconds + 1;

}
class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.life = 100;
    this.color = color;

  }

  move(xinc, yinc) {
    this.x += xinc;
    this.y += yinc;

    if (this.x >= 300) {
      this.x = 300
    }
    if (this.x <= 0) {
      this.x = 0
    }
    if (this.y <= 0) {
      this.y = 0
    }
    if (this.y >= 300) {
      this.y = 300
    }
  }

  collide(otherx, othery, otherr) {
    // true if I collided with the other thing
    let didCollide = (dist(this.x, this.y, otherx, othery) < otherr);

    if (didCollide) {
      this.color = 'red';
    } else {
      this.color = 'violet';
    }

    // tell the main program whether we had a collision
    return didCollide;
  }

  display() {
    // draw shape
    strokeWeight(3);
    stroke(this.color)
    // fill(this.color, 0);
    line(this.x - this.size, this.y, this.x + this.size, this.y);
    line(this.x, this.y - this.size, this.x, this.y + this.size);
    // strokeWeight(1);
  }
}

class Alien {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color(0);

  }

  move() {
    // print(this.ySpeed);
    this.x += this.xSpeed + newSpeed;
    if (this.x >= width + 200) {
      this.x = 0
      this.y = random(0, height)
    }

  }

  display() {

    stroke(0)
    fill(this.color);
    circle(this.x, this.y, this.r);
  }

}

class Lifebar {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = 10;

    this.life = 100;
  }

  damage(otherx, othery, otherr) {
    if (this.x == otherx) {
      // if (dist(this.x, this.y, otherx, othery) < (otherr)) {
      fill(255, 0, 0, 100);
      rect(0, 0, width, height);
      this.life -= (1 + newDamage)
    }
    if (this.life <= 0) {
      fill(0);
      rect(0, 0, width, height);
      fill(255);
      textAlign(CENTER);
      textSize(25);
      text('SCORE ' + totalSeconds, 150, 100)
      textAlign(CENTER);
      textSize(32);
      fill('yellow');
      text("GAME OVER", width / 2, height / 2);
      noLoop();
    }
  }
  display() {
    noStroke();
    fill(0);
    textSize(24);
    text(this.life, 20, 20);
  }
}

function handleKeyboard() {
  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      myPlayer.move(0, -5);
    } else if (keyCode === DOWN_ARROW) {
      myPlayer.move(0, 5);
    } else if (keyCode == LEFT_ARROW) {
      myPlayer.move(-5, 0);
    } else if (keyCode == RIGHT_ARROW) {
      myPlayer.move(5, 0);
    }
  }
}