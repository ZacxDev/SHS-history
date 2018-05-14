var lastBackground;
class Background {

  constructor(ele, x, y, w, h) {
    this.ele = ele;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    lastBackground = this;
  }

  tick() {
    this.x -= 1;
    if (this.x + this.w <= 0) {
      this.x = lastBackground.x + lastBackground.w - 2;
      lastBackground = this;
    }
  }

  render(draw) {
    draw.drawImage(this.ele, this.x, this.y, this.w, this.h);
  }

}
