let cnvWidth = document.getElementById('gridContainer').getBoundingClientRect().width;
let cnvHeight = document.getElementById('gridContainer').getBoundingClientRect().height;

let frameTime = 2;
//first collision always with the smaller block
let blockCollisionNext = true;
let digits, block1, block2, m2, w2;

function touchStarted() {
  getAudioContext().resume();
}

function resetSketch() {
  digits = document.getElementById('digitSlider');
  setBlock();
  coordinates = [];
  cnv.count = 0;
  blockCollisionNext = true;
}

function setBlock() {
  block1 = new Block(cnvWidth / 6, 50, 1, 0);
  //scaling of the bigger block's width with the increase of its mass
  m2 = 100 ** (Number(digits.value - 1));
  w2 = 50 + (Number(digits.value - 1) * 10);
  block2 = new Block(cnvWidth / 2, w2, m2, 0);
}

var sketch = function(c) {
  c.countDiv;
  c.count = 0;
  c.start;
  c.clack;

  c.preload = function() {
    c.clack = c.loadSound('addons/clack.wav');
  }

  c.setup = function() {
    c.ctx = c.createCanvas(cnvWidth * 2 / 3, cnvHeight * 2 / 9);
    c.ctx.id('canvas0');
    $('#canvas0').appendTo($('#gridContainer'));
    resetSketch();
    digits.addEventListener('change', function() {
      resetSketch();
    });
    c.countDiv = c.createDiv(c.count);
    c.countDiv.id('count');
    $("#count").appendTo($("#digit"));
    c.start = c.createButton('Start!');
    c.start.id('startButton');
    $("#startButton").appendTo($("#button"));
    c.start.mousePressed(c.startSketch);
  }

  c.startSketch = function() {
    block2.v = -1;
    coordinates = [];
    coordinates.push({
      x: block2.v,
      y: block1.v
    });
  }

  c.draw = function() {
    c.background(56, 62, 66);

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
        coordinates.push({
          x: block2.v,
          y: block1.v
        });
        c.clackSound = true;
        c.count++;
      } //wall collision
      else {
        block1.reverse();
        coordinates.push({
          x: coordinates[coordinates.length - 1].x,
          y: block1.v
        });
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

    block1.show(cnv, 255, 184, 77);
    block2.show(cnv, 255, 204, 128);

    block1.blockText(cnv);
    block2.blockText(cnv);

    // c.textSize(16);
    // c.fill(0);
    // c.textAlign(c.RIGHT, c.TOP);
    // let txt = 'Mass1:' + block1.m + 'kg';
    // let txt2 = 'Mass2:' + block2.m + 'kg';
    // c.text(txt, c.ctx.width - 10, 10);
    // c.text(txt2, c.ctx.width - 10, 30);

    c.countDiv.html(c.doneStr + c.nf(c.count, digits.value));
  }

  c.windowResized = function() {
    let newWidth = document.getElementById('gridContainer').getBoundingClientRect().width;
    let newHeight = document.getElementById('gridContainer').getBoundingClientRect().height;
    c.resizeCanvas(newWidth * 2 / 3, newHeight * 2 / 9);
    block1.x = newWidth / 6;
    block2.x = newWidth / 2;
  }

}

var cnv = new p5(sketch);