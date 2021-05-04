let totalSeconds = 0;
let counter = setInterval(timer, 1000);

let myPlayer;
// let myAlien;
let myLifebar

let aliens = [];
let aliens1 = [];
let healths = [];
let timeLastAdded = 0;
let timeLastAdded1 = 0;
let timeLastAdded2 = 0;
let timeLastAdded3 = 0;
let timeLastAdded4 = 0;

let newSpeed = 1
let newSpeed1 = 0.5
let newDamage = 1

let ufo
let ufo1
let space
let healthbox
let change = 0
let myFont;

let slide, slide1
let expo
let expo1
let music
let shoot
let pup
let tp

function preload() {
  ufo = loadImage('alien.png')
  space = loadImage('spaceback.png')
  healthbox = loadImage('health.png')
  ufo1 = loadImage('alien1.png')
  myFont = loadFont('vhs.ttf')

  expo = loadSound('explosion.mp3')
  expo1 = loadSound('explosion2.mp3')
  music = loadSound('music.mp3')
  shoot = loadSound('shoot.mp3')
  pup = loadSound('powerup.mp3')
  tp = loadSound('tp.mp3')

}

function setup() {
  createCanvas(600, 300);

  let newAlien = new Alien(0, random(height), 30, 0, 2);
  aliens.push(newAlien); // add my new alien to the array
  // print(aliens);

  let newAlien1 = new Alien(0, random(height), 30, 0, 2);
  aliens1.push(newAlien1);

  let newHealth = new Health(-100, random(height), 30, 0, 2);
  healths.push(newHealth);

  myPlayer = new Player(width / 2,
    height - 0,
    20,
    color);

  myLifebar = new
  Lifebar(width, (0, height), 100)

  slide = createSlider(0, 1, 1, 0.05);
  slide.position(0, 320)
  slide.input(slidefunc);
  slide.size(600, 5);

  slide1 = createSlider(0, 1, 1, 0.05);
  slide1.position(0, 350)
  slide1.input(slidefunc);
  slide1.size(600, 5);

  music.loop();
   shoot.setVolume(0.05)
  


}

function draw() {
  noStroke();
  // fill(255)
  // rect(0, 0, 600, 300)

  image(space, 0, 0);
  slidefunc()




  if (totalSeconds > 0) {
    noStroke();
    fill(0);
    textFont(myFont);
    textSize(10);
    text(totalSeconds, width - 40, height - (height - 18));
  }

  // add a new alien every 10 seconds
  if (millis() - timeLastAdded > 8000) {
    // add another alien
    let newAlien = new Alien(0, random(height), 30, 0, 2);
    aliens.push(newAlien); // add my new alien to the array
    // print(aliens);
    // print(newSpeed);
    timeLastAdded = millis()
    newSpeed = newSpeed + 0.25;
    if (newSpeed >= 7) {
      newSpeed = 7
    }
  }

  ///////////////////////
  // add a new alien every 10 seconds
  if (millis() - timeLastAdded1 > 5000) {
    // add another alien
    let newAlien1 = new Alien(0, random(height), 30, 0, 2);
    aliens1.push(newAlien1); // add my new alien to the array
    // print(aliens);
    newSpeed1 = newSpeed1 + 0.15;
    change = change + 50

    timeLastAdded1 = millis()
    // print(newSpeed);
    // print(change);
    if (newSpeed1 >= 6) {
      newSpeed1 = 6
    }

    if (change >= 500) {
      change = 500
    }
  }


  //////////////////////////

  if (millis() - timeLastAdded3 > 30000) {
    // add another alien
    let newHealth = new Health(random(width), 0, 30, 0, 2);
    healths.push(newHealth); // add my new alien to the array
    // print(aliens);
    timeLastAdded3 = millis()
    // print(newSpeed);

  }




  if (millis() - timeLastAdded2 > (20000)) {

    timeLastAdded2 = millis()
    newDamage = newDamage + 1
    if (newDamage >= 7) {
      newDamage = 7
    }
    print(newDamage);

  }

  // move the aliens
  for (let i = 0; i < aliens.length; i++) {
     if (millis() - timeLastAdded4 > 2000 - change) {
      // add another alien
       fill(255, 0, 255, 200);
       ellipse(aliens[i].x, aliens[i].y, 100, 100);
      aliens[i].y = random(0, height);
      tp.play();

      timeLastAdded4 = millis()

    }
    aliens[i].move();

  }

  for (let i = 0; i < aliens1.length; i++) {
    aliens1[i].move1();

  }

  for (let i = 0; i < healths.length; i++) {
    healths[i].move();

  }

  handleKeyboard();

  if (keyIsPressed && keyCode === 32) {
    fill(255, 100);
    rect(0, 0, width, height);
    shoot.play();
  }

  // loop over aliens and check if they collided
  for (let g = 0; g < aliens.length; g++) {

    if (aliens[g].x >= width && aliens[g].x <= width + 1) {
      fill(255, 0, 0, 100);
      rect(0, 0, width, height);
      myLifebar.life -= newDamage
      // aliens.splice(g, 1);
    }


    if (myPlayer.collide(aliens[g].x, aliens[g].y, aliens[g].r) &&
      (keyIsPressed && keyCode === 32)) {
      // delete this circle
      explosion();
      expo.play();
      
      aliens.splice(g, 1);
    } else {
      aliens[g].display1();
    }



  }

  for (let g = 0; g < aliens1.length; g++) {


    if (aliens1[g].x >= width && aliens1[g].x <= width + 2) {
      fill(255, 0, 0, 100);
      rect(0, 0, width, height);
      myLifebar.life -= newDamage
      // aliens1.splice(g, 1);
    }


    if (myPlayer.collide(aliens1[g].x, aliens1[g].y, aliens1[g].r) &&
      (keyIsPressed && keyCode === 32)) {
      // delete this circle

      explosion();
        expo1.play();
      aliens1.splice(g, 1);
    } else {
      aliens1[g].display();
    }



  }


  for (let w = 0; w < healths.length; w++) {
    // print(healths[w].a, healths[w].s, healths[w].d)
    if (myPlayer.collide1(healths[w].a, healths[w].s, healths[w].d) &&
      (keyIsPressed && keyCode === 32)) {
      // delete this circle
      myLifebar.life += 5
      if (myLifebar.life >= 100) {
        myLifebar.life = 100;
      }
      healths.splice(w, 1);
      fill(0, 255, 0, 100);
      rect(0, 0, width, height);
      pup.play();
    } else {
      if (healths[w].s == 400) {
        healths.splice(w, 1);
      } else {
        healths[w].display();
      }
    }



  }

  myPlayer.display();

  myLifebar.damage();
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

    if (this.x >= 600) {
      this.x = 600
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
      this.color = 'white';
    }

    // tell the main program whether we had a collision
    return didCollide;
  }

  collide1(othera, others, otherd) {
    // true if I collided with the other thing
    let didCollide1 = (dist(this.x, this.y, othera, others) < otherd);

    if (didCollide1) {
      this.color = 'green';
    } else {
      this.color = 'white';
    }

    // tell the main program whether we had a collision
    return didCollide1;
  }

  display() {
    // draw shape
    strokeWeight(3);
    stroke(this.color)
    // fill(this.color, 0);
    line(this.x - this.size - 10, this.y, this.x + this.size - 20, this.y);

    line(this.x - this.size + 20, this.y, this.x + this.size + 10, this.y);

    line(this.x, this.y - this.size + 20, this.x, this.y + this.size + 10);
    line(this.x, this.y - this.size - 10, this.x, this.y + this.size - 20);
    // strokeWeight(1);

    noFill();
    circle(this.x, this.y, this.size + 10)
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

  move1() {
    // print(this.ySpeed);
    this.x += this.xSpeed + newSpeed;
    if (this.x >= width + 200) {
      this.x = 0
      this.y = random(0, height)
    }

  }

  move() {
    // print(this.ySpeed);
    this.x += this.xSpeed + newSpeed1;
    if (this.x >= width + 200) {
      this.x = 0
      this.y = random(0, height)
    }
  }

  display() {

    //     stroke(0)
    //     fill(0, 0);
    //     circle(this.x, this.y, this.r);
    imageMode(CENTER);
    ufo.resize(40, 40);
    image(ufo, this.x, this.y)
  }

  display1() {

    //     stroke(0)
    //     fill(0, 0);
    //     circle(this.x, this.y, this.r);
    imageMode(CENTER);
    ufo1.resize(70, 70);
    image(ufo1, this.x, this.y)
  }


}

class Lifebar {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.life = 100;
  }

  damage(otherx, othery, otherr) {
    // if (this.x == otherx ) {
    // if (dist(this.x, this.y, otherx, othery) < (otherr)) {
    // this.life -= (1 + newDamage)
    if (this.life <= 0) {
      fill(0);
      noStroke();
      rect(0, 0, width, height);
      fill(255);
      textFont(myFont);
      textAlign(CENTER);
      textSize(25);
      text('SCORE ' + totalSeconds, width / 2, 100)
      textAlign(CENTER);
      textSize(32);
      fill('yellow');
      text("GAME OVER", width / 2, height / 2);
      noLoop();
    }
  }
  display() {
    noStroke();
    let nowhealth = map(this.life, 0, 100, 0, 500);
    let redhealth = map(this.life, 100, 0, 0, 255);
    let greenhealth = map(this.life, 0, 100, 0, 255);
    fill(redhealth, greenhealth, 0)
    rect(15, 5, nowhealth, 15)

    fill(255);
    textFont(myFont)
    textSize(14);
    text(this.life, 20, 19);
  }
}

class Health {
  constructor(a, s, d, xSpeed, ySpeed) {
    this.a = a;
    this.s = s;
    this.d = d;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;


  }

  move() {
    // print(this.ySpeed);
    this.s += this.ySpeed;
    if (this.s >= height + 200) {
      this.s = 0
      this.a = random(0, width);
      this.ySpeed = 1;
    }
  }

  display() {
    noStroke();
    // fill(0, 255, 0);
    // circle(this.a, this.s, this.d);
    healthbox.resize(50, 50);
    image(healthbox, this.a, this.s);
  }

}

function explosion() {
  fill(255, 200, 150);
  ellipse(myPlayer.x, myPlayer.y, 100, 100);
  fill(255, 50, 150);
  ellipse(myPlayer.x, myPlayer.y, 50, 50);
  fill(255);
  ellipse(myPlayer.x + random(-50, 50), myPlayer.y + random(-50, 50), 25, 25);
  ellipse(myPlayer.x + random(-50, 50), myPlayer.y + random(-50, 50), 15, 15);
  ellipse(myPlayer.x + random(-50, 50), myPlayer.y + random(-50, 50), 10, 10);
}

function slidefunc() {
  // y = slide.value();
  // print(y);

  newVol = slide.value();
  fxVol = slide1.value();
  // print(speed1);
  music.setVolume(newVol)
  expo.setVolume(fxVol)
  expo1.setVolume(fxVol)
  pup.setVolume(fxVol)
  tp.setVolume(fxVol)
 
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