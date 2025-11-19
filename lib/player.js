var debug=document.getElementById("debug")
var canvas=document.getElementById("screen")
export class Player{
    pos=0
    hover=-1
    cursor={
        x:0,
        y:0
    }
    start=false
    game
    constructor(game){
        this.game=game
        window.addEventListener("mousemove", (e) => {
            var canvaspos=canvas.getBoundingClientRect()
            
            // debug.innerHTML=
            // (e.x+" "+e.y)+"<br>"+
            // canvaspos.left+" "+canvaspos.top+"<br>"+
            // (((e.x-canvaspos.left)/canvas.width)+" "+((e.y-canvaspos.top)/canvas.height))+"<br>"+
            // (((e.x-canvaspos.left)/canvas.width)*1600+" "+((e.y-canvaspos.top)/canvas.height)*900)
            this.cursor={
                x:Math.round(((e.x-canvaspos.left)/canvas.width)*1600),
                y:Math.round(((e.y-canvaspos.top)/canvas.height)*900)
            }
                
        });
        window.addEventListener("mouseup", (e) => {
            if(this.hover!=-1&&e.button==0){
                var md = this.game.map.data()
                if(md){
                    // alert(md.rooms[this.pos].doors[this.hover].location)
                    if(md.rooms[this.pos].doors[this.hover].location!=-1){
                        this.pos=md.rooms[this.pos].doors[this.hover].location
                    }
                }
            }
            if(e.button==1){
                this.game.map.map="testmap.json"
                this.game.map.makemap()
                this.start=false
            }
                
        });
    }
    tick(){
        // canvas.requestFullscreen();
        var md = this.game.map.data()
        if(md){
            if(!this.start){
                this.pos=md.start
                this.start=true
            }
            var mr = md.rooms[this.pos]
            var doors = mr.doors
            this.hover=-1
            for(let i = 0; i < doors.length;i++){
                // debug.innerHTMl=this.cursor.x+" "+doors[i].x
                if(this.prc(this.cursor,doors[i])){
                    this.hover=i
                }
            }
        }
    }
    prc(point={x:0,y:0},rect={x:0,y:0,w:0,h:0}){ //pointrectcolide
        if(point.x>rect.x&&point.x<rect.x+rect.w&&point.y>rect.y&&point.y<rect.y+rect.h){
            return(true)
        }
        return(false)
    }
}