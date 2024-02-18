class Player {
  constructor(game) {
    this.game = game;
    this.x = 20;
    this.y;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.height;
    this.width;
    this.speedY;
    this.flapSpeed;
    this.collisionX = this.x;
    this.collisionY;
    this.collisionRadius;
    this.collided;
    this.energy = 30;
    this.maxEnergy = this.energy * 2;
    this.minEnergy = 15;
    this.charging;
    this.image=document.getElementById("fish")
    this.imgHeight=this.image.height
    this.imgWidth=this.image.width
    this.frameY
  }
  draw() {
    // this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    // this.game.ctx.beginPath();
    // this.game.ctx.arc(
    //   this.collisionX + this.width * 0.5,
    //   this.collisionY + this.height * 0.5,
    //   this.collisionRadius,
    //   0,
    //   2 * Math.PI
    //   );
    //   this.game.ctx.stroke();
      this.game.ctx.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.x, this.y,this.width, this.height)
    }
  update() {
    this.handleEnergy();

    this.y += this.speedY;

    this.collisionY = this.y;
    if (!this.isTouchingBottom()) {
      this.speedY += this.game.gravity;
    }
    if (this.isTouchingBottom()) {
      this.y = this.game.height - this.height;
    }
    if (this.isTouchingTop()){
      this.y=0
    }
  }
  resize() {
    //resizing based on height of the canvas
    this.width = this.spriteWidth * this.game.ratio;
    this.height = this.spriteHeight * this.game.ratio;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedY = -5 * this.game.ratio;
    this.flapSpeed = 5 * this.game.ratio;
    this.collisionRadius = this.width * 0.5;
    this.collided = false;
    this.charging=false
    this.frameY=0
  }
  startCharge() {
    this.charging = true;
    this.game.speed = this.game.maxSpeed;
  }
  stopCharge() {
    this.charging = false;
    this.game.speed = this.game.minSpeed;
  }
  isTouchingTop() {
    return this.y < 0;
  }
  isTouchingBottom() {
    return this.y > this.game.height - this.height;
  }
  handleEnergy() {
    if (this.game.eventUpdate) {
      if (this.energy < this.maxEnergy) {
        this.energy += 1;
      }
      if (this.charging) {
        this.energy -= 12;
        if (this.energy <= 0) {
          this.energy = 0;
          this.stopCharge();
        }
      }
    }
  }
  flap() {
    if (!this.isTouchingTop()) {
      this.speedY = -this.flapSpeed;
    }
  }
}
