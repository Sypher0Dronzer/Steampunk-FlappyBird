/**@type {HTMLCanvasElement} */

class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.background = new Background(this);
    this.ratio = this.height / this.baseHeight;
    this.player = new Player(this);
    this.obstacles = [];
    this.numberOfObstacles = 10;
    this.gravity;
    this.speed;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    //mouse controls
    this.canvas.addEventListener("mousedown", (e) => {
      this.player.flap();
    });
    //keyboard controls
    this.canvas.addEventListener("keydown", (e) => {
      if (e.key == "Enter" || e.key == " ") {
        this.player.flap();
      }
    });
    //touch events
    this.canvas.addEventListener("touchstart", (e) => {
      this.player.flap();
    });
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    // states get reset when the canvas is resized so its better to change state only when resized for performance reasons
    this.ctx.fillStyle = "red";

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;
    this.speed = 2 * this.ratio;
    this.gravity = 0.15 * this.ratio;

    this.background.resize();
    this.player.resize();
    this.createObstacles()
    this.obstacles.forEach(obstacle=>{
        obstacle.resize()
    })
  }
  render() {
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach(obstacle=>{
        obstacle.update()
        obstacle.draw()
    })
  }
  createObstacles() {
    this.obstacles=[]
    //deletes all the previous obstacles
    const firstX=100
    const obstacleSpacing=100
    for(let i=0;i< this.numberOfObstacles;i++){
        this.obstacles.push(new Obstacle(this,firstX+ i*obstacleSpacing))
    }
  }
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.height = 720;
  canvas.width = 720;
  const game = new Game(canvas, ctx);
  game.render();

  function animate() {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
