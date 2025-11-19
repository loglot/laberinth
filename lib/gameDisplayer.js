var canvas = document.getElementById("screen")
var ctx = canvas.getContext("2d")
export class Display{
    game
    theme=""
    timer=0
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
            this.renderRoom(md.rooms[this.game.player.pos])
            if(this.game.player.hover!=-1){
                var cursor = "%theme%.cursor.active"
            }else{
                var cursor = "%theme%.cursor.inactive"
            }
        ctx.drawImage(this.game.themes.getImg(md.rooms[this.game.player.pos].theme,cursor),this.game.player.cursor.x-50,this.game.player.cursor.y-50,100,100)
        }
        // if(Math.random() > .9)alert(this.game.themes.getImg().src+" aaa ")
        this.timer++
        if(this.timer>10){
            this.timer=0
            // alert("this.game.themes.find returns : "+this.game.themes.find("original/","%theme%.doors.wood.center"))
        }
    }
    renderRoom(mr){
        if(mr.index.background){
            ctx.drawImage(this.game.themes.getImg(mr.theme,mr.background),0,0,1600,900)

        }
        if(mr.index.doors){
            for(let i = 0; i<mr.doors.length;i++){
                ctx.fillStyle="#000"    
                var door=mr.doors[i]
                ctx.drawImage(this.game.themes.getImg(mr.theme,door.asset),door.x,door.y,door.w,door.h)
                if(door.location==-1){
                    ctx.lineWidth=10
                    ctx.strokeStyle="#f00"
                    ctx.strokeRect(door.x,door.y,door.w,door.h)
                }
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