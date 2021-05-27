let cnv2Width = document.getElementById('gridContainer').getBoundingClientRect().width;
let cnv2Height = document.getElementById('gridContainer').getBoundingClientRect().height;
let size;
let coordinates = [];

//radius is sqrt mass of the moving block because the other one does not move
//and the velocity square is 0
function radius() {
  let r = cnv2.int(block2.m ** 0.5);
  return r;
}

var sketch = function(s) {
  s.xPos;
  s.yPos;

  s.setup = function() {
    s.ctx = s.createCanvas(cnv2Width * 2 / 3, cnv2Height * 4 / 9);
    s.ctx.id('canvas1');
    $('#canvas1').appendTo('#gridContainer');
    resetSketch();
    digits.addEventListener('change', function() {
      resetSketch();
    });
  }

  //modify to consider the canvas a rectangle and not a square anymore
  s.graph = function() {
    size = s.ctx.width;
    s.translate(size / 2, size / 2);
    //axis
    s.strokeWeight(1);
    s.stroke(100);
    s.line(-size / 2, 0, size / 2, 0);
    s.line(0, -size / 2, 0, size / 2);
    s.fill(100);
    s.triangle(size / 2, 0, size / 2 - 10, 10, size / 2 - 10, -10);
    s.triangle(0, -size / 2, 10, -size / 2 + 10, -10, -size / 2 + 10);
    //circle
    s.noFill();
    s.strokeWeight(4);
    s.stroke(0);
    s.ellipseMode(s.RADIUS);
    s.ellipse(0, 0, size * 4 / 9, size * 4 / 9);
  }

  s.draw = function() {
    s.background(56, 62, 66);
    s.graph();

    for (c in coordinates) {
      s.strokeWeight(1);
      s.xScl = size * 4 / 9;
      s.yScl = -(size * 4 / 9) / (block2.m ** 0.5);
      s.point(coordinates[c].x * s.xScl, coordinates[c].y * s.yScl);
      if (c % 2 == 0) {
        s.stroke(171, 100, 46);
      } else {
        s.stroke(116, 94, 61);
      }
      if (c > 0) {
        s.line(coordinates[c - 1].x * s.xScl, coordinates[c - 1].y * s.yScl, coordinates[c].x * s.xScl, coordinates[c].y * s.yScl);
      }
      //maybe make the points more visible and interactable or just add a dom element
    }
  }

  s.windowResized = function() {
    let newWidth = document.getElementById('gridContainer').getBoundingClientRect().width;
    let newHeight = document.getElementById('gridContainer').getBoundingClientRect().height;
    s.resizeCanvas(newWidth * 2 / 3, newHeight * 4 / 9);
  }

}

var cnv2 = new p5(sketch, 'canvas1');