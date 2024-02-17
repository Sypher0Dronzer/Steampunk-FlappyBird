class Player{
    constructor(game){
        this.game=game
        this.x=20
        this.y=50
        this.spriteWidth=200;
        this.spriteHeight=200
        this.height
        this.width
        this.resize()
    }
    draw(){
        this.game.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    update(){
        // this.x++
    }
    resize(){
        //resizing based on height of the canvas
        this.width=this.spriteWidth * this.game.ratio;
        this.height=this.spriteHeight * this.game.ratio
    }
}