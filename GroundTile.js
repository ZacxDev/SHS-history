var lastTile;
class GroundTile {

  constructor(ele, x, y, w, h) {
    this.ele = ele;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    lastTile = this;
  }

  tick() {
    this.x -= 5;
    if (this.x + this.w <= 0) {
      this.x = lastTile.x + lastTile.w - 5;
      lastTile = this;
    }
  }

  render(draw) {
    draw.drawImage(this.ele, this.x, this.y, this.w, this.h);
  }

}
