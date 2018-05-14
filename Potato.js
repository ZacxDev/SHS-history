var potatos = [];
var spawnTimer = 60;
class Potato {

  constructor(x, y, w, h, rot) {
    this.ele = rot ? document.querySelector('.rotPotatoImg') : document.querySelector('.potatoImg');
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rot = rot;
    this.dead = false;
    potatos.push(this);
  }

  tick() {
    this.x -= 5;
    if (this.x + this.w < 0) {
      potatos.splice(0, 1);
      return;
    }
    if (this.IntersectsWith(gameController.player.x, gameController.player.y, gameController.player.w, gameController.player.h) && !this.dead) {
      this.dead = true;
      this.rot ? gameController.player.kill() : gameController.potatoScore++;
    }
  }

  render(draw) {
    if (this.dead) {
      return;
    }
    draw.drawImage(this.ele, this.x, this.y, this.w, this.h);
  }


  static tickAll() {
    for (var p in potatos) {
      potatos[p].tick();
    }
    if (spawnTimer > 0) {
      spawnTimer--;
      return;
    }
    spawnTimer = 60;
    if (true) {
      if (Math.floor(Math.random() * 3) + 1 === 2) {
        new Potato(window.CANVAS_WIDTH, 650, 48, 32, true);
      } else {
        new Potato(window.CANVAS_WIDTH, 600 - (Math.random() * 150), 48, 32, false);
      }
    }
  }

  static renderAll(draw) {
    for (var p in potatos) {
      potatos[p].render(draw);
    }
  }

  IntersectsWith(x, y, w, h)
  {
    return (x < this.x + this.w && this.x < x + w && y < this.y + this.h && this.y < y + h);
  }

}
