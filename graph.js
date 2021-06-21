let cnv2Width = document.getElementById('gridContainer').getBoundingClientRect().width;
let cnv2Height = document.getElementById('gridContainer').getBoundingClientRect().height;
let xSize, ySize;
let coordinates = [];
let toggle = document.getElementById('toggleButton');


//radius is sqrt mass of the moving block because the other one does not move
//and the velocity square is 0
function radius() {
  let r = cnv2.int(block1.m ** 0.5);
  return r;
}

var sketch = function(s) {

  s.setup = function() {
    s.ctx = s.createCanvas(cnv2Width * 2 / 3, cnv2Height * 4 / 9);
    s.ctx.id('canvas1');
    $('#canvas1').appendTo('#gridContainer');
    resetSketch();
    digits.addEventListener('change', function() {
      resetSketch();
    });
  }

  s.graph = function() {
    xSize = s.ctx.width;
    ySize = s.ctx.height;
    s.translate(xSize / 2, ySize / 2);
    //axis
    s.strokeWeight(1);
    s.stroke(100);
    s.line(-xSize / 2, 0, xSize / 2, 0);
    s.line(0, -ySize / 2, 0, ySize / 2);
    s.fill(100);
    s.triangle(xSize / 2, 0, xSize / 2 - 10, 10, xSize / 2 - 10, -10);
    s.triangle(0, -ySize / 2, 10, -ySize / 2 + 10, -10, -ySize / 2 + 10);
    //circle
    s.noFill();
    s.strokeWeight(4);
    s.stroke(0);
    // s.ellipseMode(s.RADIUS);
    if (xSize > ySize) {
      s.ellipse(0, 0, ySize * 3 / 4, ySize * 3 / 4);
    } else {
      s.ellipse(0, 0, xSize * 3 / 4, xSize * 3 / 4);
    }
  }


  s.phase = function() {
    for (c in coordinates) {
      s.strokeWeight(1);
      if (xSize > ySize) {
        s.xScl = ySize * 3 / 8;
        s.yScl = -(ySize * 3 / 8) / (block1.m ** 0.5);
      } else {
        s.xScl = xSize * 3 / 8;
        s.yScl = -(xSize * 3 / 8) / (block1.m ** 0.5);
      }
      s.point(coordinates[c].x * s.xScl, coordinates[c].y * s.yScl);
      if (c % 2 == 0) {
        s.stroke(255, 184, 77);
      } else {
        s.stroke(255, 204, 128);
      }
      if (c > 0) {
        s.line(coordinates[c - 1].x * s.xScl, coordinates[c - 1].y * s.yScl, coordinates[c].x * s.xScl, coordinates[c].y * s.yScl);
      }
    }
  }

  s.draw = function() {
    s.background(56, 62, 66);
    s.graph();
    s.phase();
  }

  s.windowResized = function() {
    let newWidth = document.getElementById('gridContainer').getBoundingClientRect().width;
    let newHeight = document.getElementById('gridContainer').getBoundingClientRect().height;
    s.resizeCanvas(newWidth * 2 / 3, newHeight * 4 / 9);
  }

}

let cnv2;
let tCount = 1;

function setGraph() {
  cnv2 = new p5(sketch);
}
toggle.addEventListener('click', function() {
  if (tCount % 2 != 0) {
    setGraph();
    cnv2.windowResized();
    tCount = 1;
    document.getElementById("toggleButton").innerHTML = "Disattiva grafico";
  } else if (tCount % 2 == 0) {
    cnv2.remove();
    cnv.preload();
    document.getElementById("toggleButton").innerHTML = "Attiva grafico";
  }
  tCount++;
});