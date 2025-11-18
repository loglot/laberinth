var canvas = document.getElementById("screen")
var ctx = canvas.getContext("2d")
export class Display{
    game
    theme=""
    constructor(game){
        this.game=game
    }
    canvasstat={
        start:{
            width:1600,
            height:900
        }
    }

    tick(){
        this.resize()
        var md = this.game.map.data()
        if(md){
            this.theme=md.theme
            this.renderRoom(md.rooms[1])
        }
    }
    renderRoom(mr){
        if(mr.index.doors){
            for(let i = 0; i<mr.doors.length;i++){
                var door=mr.doors[0]
                ctx.fillRect(door.x,door.y,door.w,door.h)
            }
        }
    }

    resize(){
        canvas.width = (window.innerWidth);
        canvas.height = (9 * (window.innerWidth) / 16);
        if(canvas.height>window.innerHeight){
            canvas.height=(window.innerHeight)
            canvas.width = (16 * (window.innerHeight) / 9)
        }
        ctx.scale(canvas.width/this.canvasstat.start.width,canvas.width/this.canvasstat.start.width)
        // this.game.displayinfo.scale=ctx.canvas.width/this.game.displayinfo.startWidth
    }   
}