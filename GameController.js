class GameController {

  constructor() {
    this.groundTiles = [];
    this.backgroundTiles = [];
    this.canvasEle;
    this.draw;
    this.player;
    this.potatoScore = 0;
    this.init();
  }

    init() {
      this.startGameLoop();
      this.initListeners();
    }

    startGameLoop() {
      this.canvasEle = document.querySelector('#potatoCanvas');
      window.CANVAS_WIDTH = this.canvasEle.width;
      window.CANVAS_HEIGHT = this.canvasEle.height;
      this.draw = this.canvasEle.getContext('2d');
      this.draw.imageSmoothingEnabled = false;
      this.player = new Player(document.querySelector('.playerImg'), 96, 600, 85, 130);
      for (var i = 0; i < 3; i++) {
        this.groundTiles[i] = new GroundTile(document.querySelector('.groundImg'), i * 900, 700, 900, 123);
        this.backgroundTiles[i] = new Background(document.querySelector('.backgroundImg'), i * 1280, 0, 1280, 725);
      }

      setInterval(this.update.bind(this), 20);
    }

    update() {
      this.tick();
      this.render(this.draw);
    }

    tick() {
      for (var tile in this.backgroundTiles) {
        this.backgroundTiles[tile].tick();
      }
      for (var tile in this.groundTiles) {
        this.groundTiles[tile].tick();
      }
      Potato.tickAll();
      this.player.tick();
    }

    render(draw) {
      draw.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);
      for (var tile in this.backgroundTiles) {
        this.backgroundTiles[tile].render(draw);
      }
      for (var tile in this.groundTiles) {
        this.groundTiles[tile].render(draw);
      }
      Potato.renderAll(draw);
      this.player.render(draw);
      draw.font = "30px Verdana";
      draw.fillText("Potatos: " + this.potatoScore, 10, 50);
    }

    initListeners() {
      document.body.addEventListener('click', this.player.jump.bind(this.player));
      document.body.addEventListener('keydown', function(e) {
        if (e.keyCode === 32) {
          this.player.jump();
        }
      }.bind(this));
    }

}
