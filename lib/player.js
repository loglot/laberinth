var debug=document.getElementById("debug")
var canvas=document.getElementById("screen")
export class Player{
    pos=0
    hover=-1
    execute=-1
    cursor={
        x:0,
        y:0
    }
    start=false
    game
    time=0
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
            if(this.hover>-1&&e.button==0){
                var md = this.game.map.data()
                if(md){
                    // alert(md.rooms[this.pos].doors[this.hover].location)
                    if(md.rooms[this.pos].doors[this.hover].location!=-1){
                        this.pos=md.rooms[this.pos].doors[this.hover].location
                    }
                }
            }
            if(this.hover==-2&&e.button==0){
                var md = this.game.map.data()
                if(md){
                    var mr=md.rooms[this.pos]
                    var button = mr.buttons[this.execute]
                    if(button.index.puzzle){
                     
                        if(button.puzzle.index.add){
                            mr.puzzle.input=mr.puzzle.input+button.puzzle.add
                            if(mr.puzzle.input.length==mr.puzzle.solution.length)this.time=20.1
                            
                        }   
                    }
                }
            }
            
            if(e.button==1){
                
                this.game.map.changeMap()
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
            if(mr.index.buttons){

                for(let i = 0; i<mr.buttons.length;i++){
                    var button=mr.buttons[i]
                    if(this.prc(this.cursor,button)){
                        this.hover=-2
                        this.execute=i
                    }
                }
            }
        }
        this.time--
        if(Math.round(this.time*10)==1){
            var puzzle=md.rooms[this.pos].puzzle
            if(puzzle.input==puzzle.solution){
                puzzle.correct=true
                this.time=30.3
            }else{
                puzzle.correct=false
                this.time=50.2
            }
        }
        if(Math.round(this.time*10)==2){
            var puzzle=md.rooms[this.pos].puzzle
                puzzle.correct=null
                puzzle.input=""

        }
        if(Math.round(this.time*10)==3){
            var puzzle=md.rooms[this.pos].puzzle
                // puzzle.correct=null
                puzzle.input=""
                if(puzzle.index.remove){
                    for(let i = 0; i< puzzle.remove.length;i++){
                        for(let z = 0; z< puzzle.remove[i].length-1;z++){
                            eval("md.rooms[this.pos]."+puzzle.remove[i][0]+".splice(puzzle.remove[i][z+1],1)")
                        }
                    }
                }
                if(puzzle.index.add){
                    for(let i = 0; i< puzzle.add.length;i++){
                        for(let z = 0; z< puzzle.add[i].length-1;z++){
                            eval("md.rooms[this.pos]."+puzzle.add[i][0]+".push(puzzle.add[i][z+1])")
                        }
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