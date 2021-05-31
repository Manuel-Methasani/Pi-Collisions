class Block {
  constructor(x, w, m, v) {
    this.x = x;
    this.y = cnv.height - w;
    this.w = w;
    this.m = m;
    this.v = v;
  }
  //returning the absolute value because more physically accurate
  //time cannot be negative, we would worry only on the time approaching 0
  time2Wall() {
    return Math.abs(this.x / this.v);
  }

  time2Block(other) {
    let dX = other.x - (this.x + this.w);
    let dV = Math.abs(this.v - other.v);
    return dX / dV;
  }
  //multiplying by dT will just make the blocks move slower when a lot
  //of collisions are happening since the dT is very small and bascially
  //slowing the blocks down, making the simulation smoother and avoiding overlapping
  move(dT) {
    this.x += this.v * dT;
  }

  //this 1 other 2
  bounce(other) {
    let sumM = this.m + other.m;
    let diffM = this.m - other.m;
    let twoM = 2 * other.m;
    let newV = (diffM / sumM) * this.v + (twoM / sumM) * other.v;
    return newV;
  }

  reverse() {
    this.v *= -1;
  }

  blockText(here) {
    here.textSize(16);
    here.fill(158, 158, 158);
    here.textAlign(here.CENTER, here.CENTER);
    let blockTxt = this.m + 'kg';
    here.text(blockTxt, this.x + this.w / 2 - 1, this.y - 10);
  }

  show(here, r, g, b) {
    here.fill(r, g, b);
    here.rect(this.x, this.y, this.w);
  }

}