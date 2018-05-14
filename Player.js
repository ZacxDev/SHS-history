class Player {

  constructor(ele, x, y, w, h) {
    this.ele = ele;
    this.x = x;
    this.originY = y;
    this.y = y;
    this.w = w;
    this.h = h;
    this.doFlip = false;
    this.doFlipTimer = 7;
    this.velY = 0;
    this.jumpTimer = 0;
    this.isJumping = false;
  }

  tick() {
    this.jumpTick();
    if (this.doFlipTimer <= 0) {
      this.doFlip = !this.doFlip;
      this.doFlipTimer = 7;
    } else {
      this.doFlipTimer--;
    }
    if (this.y + this.velY < this.originY) {
      this.y += this.velY
    } else {
      this.velY = 0;
      this.isJumping = false;
    }
  }

  render(draw) {
    draw.setTransform(1, 0, 0, 1, this.x + this.w/2, this.y + this.h/2);
    this.doFlip && !this.isJumping ? draw.rotate(5*Math.PI/180) : draw.rotate(-5*Math.PI/180);
    draw.drawImage(this.ele, -this.w/2, -this.h/2);
    draw.setTransform(1,0,0,1,0,0);
  }

  jump() {
    if (this.isJumping) {
      return;
    }
    this.jumpTimer = 8;
    this.isJumping = true;
  }

  jumpTick() {
    if (this.jumpTimer <= 0) {
      this.velY < 12 ? this.velY+=1.5 : void 0;
    } else {
      this.velY > -20 ? this.velY-=4 : void 0;
      this.jumpTimer--;
    }
  }

  kill() {
    window.location.reload();
  }
}
