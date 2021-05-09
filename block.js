class Block {
  constructor(x, w, m, v) {
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.m = m;
    this.v = v;
  }
  //returning the absolute value because more physically accurate
  //time cannot be negative, we would worry only on the time approaching 0
  time2Wall() {
    return abs(this.x / this.v);
  }

  time2Block(other) {
    let dX = other.x - (this.x + this.w);
    let dV = abs(this.v - other.v);
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

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w);
  }

}