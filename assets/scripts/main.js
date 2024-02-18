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
    this.minSpeed
    this.maxSpeed
    this.score;
    this.gameOver;
    this.timer;
    this.message1;
    this.message2;
    this.barSize
    //this is used for optimisation since refresh rates are different for different screens and devices
    this.eventTimer=0;
    this.eventUpdate=false
    this.eventInterval=150
    this.touchStartX;
    this.swipeDistance=50

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", (e) => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });

    //mouse controls
    this.canvas.addEventListener("mousedown", (e) => {
      this.player.flap();
    });
    //keyboard controls
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter" || e.key == " ") {
        this.player.flap();
      }
      if(e.key=="Control"|| e.key=="c" || e.key=="C")     {
        this.player.startCharge()
      } 
    });
    window.addEventListener("keyup", (e) => {
      console.log(e.key);
    
    if(e.key=="Control"|| e.key=="c" || e.key=="C")     {
      this.player.stopCharge()
    } 
  });
    //touch events
    this.canvas.addEventListener("touchstart", (e) => {
      this.player.flap();
      this.touchStartX=e.changedTouches[0].pageX;
    });
    this.canvas.addEventListener("touchmove", (e) => {
      if(e.changedTouches[0].pageX - this.touchStartX >this.swipeDistance){
        this.player.startCharge()

      }

    });
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    // states get reset when the canvas is resized so its better to change state only when resized for performance reasons
    this.ctx.fillStyle = "blue";
    this.ctx.font = "15px Bungee";
    this.ctx.textAlign = "right";
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 3;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;
    this.speed = 2 * this.ratio;
    this.minSpeed=this.speed
    this.maxSpeed=this.speed*5
    this.gravity = 0.15 * this.ratio;

    this.background.resize();
    this.player.resize();
    this.createObstacles();
    this.obstacles.forEach((obstacle) => {
      obstacle.resize();
    });

    this.score = 0;
    this.gameOver = false;
    this.timer = 0;
    this.barSize=10*this.ratio
  }
  render(deltaTime) {
    if (deltaTime){

      this.handlePeriodicEvents(deltaTime)
      if (!this.gameOver) {
        this.timer += deltaTime;
      }
    }
    this.background.update();
    this.background.draw();
    this.drawStatusText();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach((obstacle) => {
      obstacle.update();
      obstacle.draw();
    });
  }
  createObstacles() {
    this.obstacles = [];
    //deletes all the previous obstacles
    const firstX = 600;
    const obstacleSpacing = 600 * this.ratio;
    for (let i = 0; i < this.numberOfObstacles; i++) {
      this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
    }
  }
  checkCollision(a, b) {
    const dx = a.collisionX - b.collisionX;
    const dy = a.collisionY - b.collisionY;
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = a.collisionRadius + b.collisionRadius;
    return distance < sumOfRadii;
  }
  formatTimer() {
    return (this.timer * 0.001).toFixed(2);
  }
  handlePeriodicEvents(deltaTime){
    if(this.eventTimer<this.eventInterval){
      this.eventTimer+=deltaTime
      this.eventUpdate=false
    }
    else{
      this.eventTimer %= this.eventInterval;
      this.eventUpdate=true
    }
  }

  drawStatusText() {
    this.ctx.save();
    this.ctx.fillText("Score: " + this.score, this.width - 10, 30);
    this.ctx.textAlign = "left";
    this.ctx.fillText("Time: " + this.formatTimer(), 10, 30);
    if (this.gameOver) {
      if (this.player.collided) {
        this.message1 = "Getting Rusty Are We";
        this.message2 = "Collision Timer: " + this.formatTimer() + "seconds!";
      } else if (this.obstacles.length <= 0) {
        this.message1 = "A Job Well Done";
        this.message2 =
          "Can you do it faster than " + this.formatTimer() + "seconds?";
      }
      this.ctx.textAlign = "center";
      this.ctx.font = "30px Bungee";
      this.ctx.fillText(
        this.message1,
        this.width * 0.5,
        this.height * 0.5 - 20
      );
      this.ctx.font = "15px Bungee";

      this.ctx.fillText(this.message2, this.width * 0.5, this.height * 0.5);
      this.ctx.fillText(
        'Press "R" to try agian',
        this.width * 0.5,
        this.height * 0.5 + 20
      );
    }
    
   if(this.player.energy<=25){
      this.ctx.fillStyle='red'
    }
    else{
      this.ctx.fillStyle='green'

    }
    for (let i = 0; i < this.player.energy; i++) {
        this.ctx.fillRect(10+ this.barSize*i,40,this.barSize+0.5,15)
        
    }
    this.ctx.restore();
  }
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.height = 720;
  canvas.width = 720;
  const game = new Game(canvas, ctx);
  game.render();
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(deltaTime);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
