class Player{
    constructor(game){
        this.game=game
        this.x=20
        this.y
        this.spriteWidth=200;
        this.spriteHeight=200
        this.height
        this.width
        this.speedY
        
    }
    draw(){
        this.game.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    update(){
        this.y+=this.speedY
        if(!this.isTouchingBottom()){
            this.speedY+=this.game.gravity
        }
        if(this.isTouchingBottom()){
this.y=this.game.height-this.height
        }
    }
    resize(){
        //resizing based on height of the canvas
        this.width=this.spriteWidth * this.game.ratio;
        this.height=this.spriteHeight * this.game.ratio;
        this.y=this.game.height *0.5 - this.height *0.5
        this.speedY= -5* this.game.ratio
    }
    isTouchingBottom(){
        return this.y > this.game.height - this.height
    }
}