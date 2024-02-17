class Player{
    constructor(game){
        this.game=game
        this.x=20
        this.y=50
        this.height=100
        this.width=100
    }
    draw(){
        this.game.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    update(){
        this.x++
    }
}