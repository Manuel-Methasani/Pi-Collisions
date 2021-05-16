let size = 400;

function radius(m1, m2, v1, v2) {
  let sumOfSquares = m1 * v1 ** 2 + m2 * v2 ** 2;
  let r = sumOfSquares ** 0.5;
  return r;
}

var sketch = function(s) {
  s.xPos;
  s.yPos;

  s.graph = function() {
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
    s.ellipse(0, 0, 50 + radius(block1.m, block2.m, block1.v, block2.v), 50 + radius(block1.m, block2.m, block1.v, block2.v));
  }

  s.setup = function() {
    s.ctx = s.createCanvas(size, size);
    s.ctx.position(s.xPos, s.yPos);
  }

  s.draw = function() {
    s.background(50);
    s.graph();

    for (c in s.coordinates) {
      s.xScl = 50 + radius(block1.m, block2.m, block1.v, block2.v);
      s.yScl = -s.xScl;
      s.point(coordinates[c].x * s.xScl, coordinates[c].y * s.yScl);
      if (c > 0) {
        s.line(coordinates[c - 1].x * s.xScl, coordinates[c - 1].y * s.yScl, coordinates[c].x * s.xScl, coordinates[c].y * s.yScl);
      }
    }
  }

}

let cnv2 = new p5(sketch);

cnv2.xPos = 0;
cnv2.yPos = 400;