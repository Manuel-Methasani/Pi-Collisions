let block1, block2, m2, w2;
let frameTime = 2,
  coordinates = [];
//first collision always with the smaller block
let blockCollisionNext = true;


//set initally block2.v to 0 and when a touch happens make it start with the
//following function which also calls the AudioContext
//basically creating a start screen
function touchStarted() {
  getAudioContext().resume();
}


function resetSketch() {
  block1 = new Block(100, 50, 1, 0);
  //scaling of the bigger block's width with the increase of its mass
  m2 = 100 ** (cnv.digits.value() - 1)
  w2 = 50 + ((cnv.digits.value() - 1) * 10);
  block2 = new Block(400, w2, m2, -1);
  cnv.count = 0;
  blockCollisionNext = true;
}

var sketch = function(c) {
  c.digits;
  c.countDiv;
  c.count = 0;
  c.xElt;
  c.yElt;

  c.xPos;
  c.yPos;

  c.clack;

  c.preload = function() {
    c.clack = c.loadSound('addons/clack.wav')
  }

  c.setup = function() {
    c.ctx = c.createCanvas(c.windowWidth, 200);
    c.digits = c.createSlider(1, 9, 1);
    resetSketch();
    c.digits.changed(resetSketch);
    c.countDiv = c.createDiv(c.count);
    c.ctx.position(c.xPos, c.yPos);
    c.digits.position(c.xElt, c.yElt);
  }

  c.draw = function() {
    c.background(50);

    c.timeLeft = frameTime;
    c.clackSound = false;
    c.doneStr = '';

    while (true) {
      //terniary operator, if first true then variable is equal to the second
      //otherwise equal to the third
      c.time2Collision = blockCollisionNext ?
        block1.time2Block(block2) : block1.time2Wall();
      //when the collisions stop happening
      if (block1.v >= 0 & block2.v > 0 & block1.v < block2.v) {
        c.doneStr = 'Collisions done! ';
        break;
      }
      //first exit of the while loop, it makes the loop go further only when
      //approaching a collision, when the time2Collision is small enough
      if (c.timeLeft <= c.time2Collision) {
        break;
      }
      //if it arrives to this point the dT is always less than 2
      block1.move(c.time2Collision);
      block2.move(c.time2Collision);
      //block collision
      if (blockCollisionNext) {
        c.v1 = block1.bounce(block2);
        c.v2 = block2.bounce(block1);
        block1.v = c.v1;
        block2.v = c.v2;
        c.clackSound = true;
        c.count++;
      } //wall collision
      else {
        block1.reverse();
        c.clackSound = true;
        c.count++;
      }
      //update if block or wall collision whill happen next
      blockCollisionNext = !blockCollisionNext;
      c.timeLeft -= c.time2Collision;
    }

    if (c.clackSound) {
      c.clack.play();
    }

    //happens if while loop breaks, basically it makes the blocks move
    //till collision happens which makes the while loop go through
    block1.move(c.timeLeft);
    block2.move(c.timeLeft);

    block1.show();
    block2.show();

    c.countDiv.html(c.doneStr + c.nf(c.count, c.digits.value()));
    c.countDiv.position(c.xElt, c.yElt + 20);
  }

}

let cnv = new p5(sketch);

cnv.xPos = 0;
cnv.yPos = 0;
cnv.xElt = 0;
cnv.yElt = 300;


//figure out DOM errors
//connect the two sketches
//add clack sound and styling