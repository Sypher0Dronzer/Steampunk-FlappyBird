/**@type {HTMLCanvasElement} */

class Game{
    constructor(canvas,context){
        this.canvas=canvas
        this.ctx=context
        this.width=this.canvas.width
        this.height= this.canvas.height
        this.player=new Player(this)

        this.resize(window.innerWidth,window.innerHeight)

        window.addEventListener('resize',(e)=>{
            this.resize(e.currentTarget.innerWidth,e.currentTarget.innerHeight)
        });
        
    }
    resize(width,height){
        this.canvas.width=width
        this.canvas.height=height
        // states get reset when the canvas is resized so its better to change state only when resized for performance reasons
    this.ctx.fillStyle='red'

        this.width=this.canvas.width
        this.height=this.canvas.height
    }
    render(){
    this.player.update()
    this.player.draw()
    }
}

window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas1');
    const ctx= canvas.getContext('2d');
    canvas.height=720;
    canvas.width=720;
    const game= new Game(canvas,ctx)
    game.render();

    function animate(){
        game.ctx.clearRect(0,0,canvas.width,canvas.height)
        game.render()
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

})