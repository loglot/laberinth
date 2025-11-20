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
    renderRoom(mr, invisible=false){
        if(invisible){
            ctx.translate(-10000,0)
        }
        if(mr.index.background){
            ctx.drawImage(this.game.themes.getImg(mr.theme,mr.background),0,0,1600,900)

        }
        if(mr.index.shapes){
            var shapes=mr.shapes
            if(shapes.rect){
                for(let i = 0; i<shapes.rect.length;i++){
                    var rect=shapes.rect[i]
                    ctx.fillStyle=rect.color
                    ctx.fillRect(rect.x,rect.y,rect.w,rect.h)
                }
            }
        }
        if(mr.index.indicators){
            var ind=mr.indicators
            for(let i = 0; i<ind.length;i++){
                ctx.fillStyle=ind[i].inactive
                if(mr.puzzle.input.length>i){
                    ctx.fillStyle=ind[i].active
                }
                if(mr.puzzle.correct==true){
                    ctx.fillStyle=ind[i].correct
                }
                if(mr.puzzle.correct==false){
                    ctx.fillStyle=ind[i].incorrect
                }
                ctx.fillRect(ind[i].x,ind[i].y,ind[i].w,ind[i].h)
            }
        }
        if(mr.index.misc){
            for(let i = 0; i<mr.misc.length;i++){
                ctx.fillStyle="#000"    
                var misc=mr.misc[i]
                if(misc.flip){
                    this.drawFlipped(this.game.themes.getImg(mr.theme,misc.asset),misc.x,misc.y,misc.w,misc.h)
                }else{
                    ctx.drawImage(this.game.themes.getImg(mr.theme,misc.asset),misc.x,misc.y,misc.w,misc.h)
                }
            }
        }
        if(mr.index.buttons){
            for(let i = 0; i<mr.buttons.length;i++){
                ctx.fillStyle="#000"    
                var button=mr.buttons[i]
                if(button.flip){
                    this.drawFlipped(this.game.themes.getImg(mr.theme,button.asset),button.x,button.y,button.w,button.h)
                }else{
                    ctx.drawImage(this.game.themes.getImg(mr.theme,button.asset),button.x,button.y,button.w,button.h)
                }
            }
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
                }else if(!invisible){
                    var md = this.game.map.data()
                    this.renderRoom(md.rooms[door.location],true)

                }
            }
        }
        if(invisible){
            ctx.translate(10000,0)
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
    drawFlipped(img,x,y,w,h){
        ctx.translate(x+w,y);
        ctx.scale(-1,1);
        ctx.drawImage(img,0,0,w,h);
        ctx.scale(-1,1);
        ctx.translate(-(x+w),-y);
    }
}