let block1;
let block2;
let m2;
let w2;
let digits;
let count = 0;
let countDiv;
let frameTime = 2;
//first collision always with the smaller block
let blockCollisionNext = true;
let graphUpdated = false;

function setup() {
  createCanvas(windowWidth, 200);
  digits = createSlider(1, 9, 1);
  resetSketch();
  digits.changed(resetSketch);
  countDiv = createDiv(count);
}

function resetSketch() {
  block1 = new Block(100, 50, 1, 0);
  //scaling of the bigger block's width with the increase of its mass
  m2 = pow(100, digits.value() - 1)
  w2 = 50 + ((digits.value() - 1) * 10);
  block2 = new Block(400, w2, m2, -1);
  xArray = [];
  yArray = [];
  updateGraph();
  append(xArray, block2.v);
  append(yArray, block1.v);
  count = 0;
  blockCollisionNext = true;
  graphUpdated = false;
}

function draw() {
  background(50);

  let timeLeft = frameTime;
  let doneStr = '';

  while (true) {
    //terniary operator, if first true then variable is equal to the second
    //otherwise equal to the third
    let time2Collision = blockCollisionNext ?
      block1.time2Block(block2) : block1.time2Wall();
    //when the collisions stop happening
    if (block1.v >= 0 & block2.v > 0 & block1.v < block2.v) {
      doneStr = 'Collisions done! ';
      break;
    }
    //first exit of the while loop, it makes the loop go further only when
    //approaching a collision, when the time2Collision is small enough
    if (timeLeft <= time2Collision) {
      break;
    }
    //if it arrives to this point the dT is always less than 2
    block1.move(time2Collision);
    block2.move(time2Collision);
    //block collision
    if (blockCollisionNext) {
      const v1 = block1.bounce(block2);
      const v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      append(yArray, v1);
      append(xArray, v2);
      count++;
    } //wall collision
    else {
      block1.reverse();
      count++;
      append(yArray, block1.v);
      append(xArray, xArray[xArray.length - 1]);
    }
    //update if block or wall collision whill happen next
    blockCollisionNext = !blockCollisionNext;
    timeLeft -= time2Collision;
  }
  //happens if while loop breaks, basically it makes the blocks move
  //till collision happens which makes the while loop go through
  block1.move(timeLeft);
  block2.move(timeLeft);

  block1.show();
  block2.show();
  if (doneStr.includes('done') & !graphUpdated) {
    updateGraph();
    graphUpdated = true;
  }
  countDiv.html(doneStr + nf(count, digits.value()));
}