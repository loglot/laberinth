export class Map{
    DATA = {empty:true}

    pathroot = "../maps/"
    pathindex="index.json"
    map="original.json"
    index=[false]
    indexpos=0
    maps=[]
    constructor(){
        this.init()
    }
    async init(){
        //this.fetch(this.path+this.map)
        var list = await this.fetch(this.pathroot+this.pathindex)
        var arr=[]
        for(let x = 0; x< list.length;x++){
            arr[x]=await this.fetch(this.pathroot+list[x])
            arr[x]=await this.patchMap(arr[x])
            
        }
        this.index = list
        arr.unshift(await this.patchMap(this.makeHub()))
        this.index.unshift("hub.json")
        this.maps = arr
        this.DATA=this.maps[0]
        
    }

    async fetch(path){
        let response = await fetch(path);
        let data = await response.json();
        return data;  
    }
    makeHub(){
        var hub = `{
            "empty":false,
            "start":0,
            "door":"doorPos/hub.json",
            "button":"doorPos/hub.json",
            "rooms":[
                {
                    "index":{
                        "background":true,
                        "doors":true,
                        "buttons":true,
                        "shapes":true
                    },
                    "background":"%theme%.environments.stone.background",
                    "theme":"original/",`


        var shapes=`"shapes":{
                        "text":[`
        var buttons=`]},
                    "buttons":[`
        var doors=`],
                    "doors":[`
        var room=`]
                },{
                    "index":{
                        "background":true,
                        "doors":true,
                        "buttons":true,
                        "shapes":true
                    },
                    "background":"%theme%.environments.stone.background",
                    "theme":"original/",
            `
        var footer=`]
                }
            ]
        }`
        for(let i = 0; i < this.index.length;i++){

            if(i%2==0&&i!=this.index.length-1){
                shapes+=`{"str":"${this.index[i]}","x":440,"y":250,"w":300,"h":50,"size":30,"color":"#fff","background":"#000"}`
                buttons+=`
                            {
                                "asset":"%theme%.doors.stone.center","position":2,
                                "index":{"map":true},
                                "map":"${this.index[i]}"
                            }`
                shapes+=","
                buttons+=","
            }
            if(i%2==1&&i!=this.index.length-1){
                shapes+=`{"str":"${this.index[i]}","x":840,"y":250,"w":300,"h":50,"size":30,"color":"#fff","background":"#000"}`
                buttons+=`
                            {
                                "asset":"%theme%.doors.stone.center","position":1,
                                "index":{"map":true},
                                "map":"${this.index[i]}"
                            }`
                doors+=`{"asset":"%theme%.doors.stone.right","location":${Math.floor(i/2)+1}, "position":3}`
                hub+=shapes+buttons+doors+room
                shapes=`"shapes":{
                                "text":[`
                buttons=`]},
                            "buttons":[`
                doors=`],
                            "doors":[{"asset":"%theme%.doors.stone.left","location":${Math.floor(i/2)}, "position":0},`
            }
            if(i%2==0&&i==this.index.length-1){
                shapes+=`{"str":"${this.index[i]}","x":440,"y":250,"w":300,"h":50,"size":30,"color":"#fff","background":"#000"}`
                buttons+=`
                            {
                                "asset":"%theme%.doors.stone.center","position":2,
                                "index":{"map":true},
                                "map":"${this.index[i]}"
                            }`
                if(i>=2){
                    hub+=shapes+buttons+doors.slice(0,-1)+footer

                }else{
                    hub+=shapes+buttons+footer

                }

            }
            if(i%2==1&&i==this.index.length-1){
                shapes+=`{"str":"${this.index[i]}","x":840,"y":250,"w":300,"h":50,"size":30,"color":"#fff","background":"#000"}`
                buttons+=`
                            {
                                "asset":"%theme%.doors.stone.center","position":1,
                                "index":{"map":true},
                                "map":"${this.index[i]}"
                            }`
                if(i>=2){
                    hub+=shapes+buttons+doors.slice(0,-1)+footer

                }else{
                    hub+=shapes+buttons+footer

                }

            }
        }
        return JSON.parse(hub)
        // navigator.clipboard.writeText(hub)
    }

    changeMap(map=1/*map="testmap.json" works aswell */){
        if(typeof map == "string"){
            if(this.index[0]){
                var i = this.index.indexOf(map)
                if(i!=-1){
                    this.indexpos=i
                    this.load()
                }
            }

        }else{
            this.indexpos+=map
            if(this.indexpos>this.maps.length-1){
                this.indexpos=0
            }
            this.load()
        }
    }
    load(){
        this.DATA=JSON.parse(JSON.stringify(this.maps[this.indexpos]))
    }






    async patchMap(arr){
        var doorpos=await this.fetch(this.pathroot+arr.door)
        for(let y = 0; y < arr.rooms.length;y++){
            var md=arr.rooms[y].doors
            if(md)for(let z = 0; z < md.length;z++){
                if(md[z].position!=undefined){
                    md[z].x=doorpos[md[z].position].x
                    md[z].y=doorpos[md[z].position].y
                    md[z].w=doorpos[md[z].position].w
                    md[z].h=doorpos[md[z].position].h
                }
            }
            
        }
        
        if(arr.button){
            var buttonpos=await this.fetch(this.pathroot+arr.button)
            for(let y = 0; y < arr.rooms.length;y++){
                var md=arr.rooms[y].buttons
                for(let z = 0; z < md.length;z++){
                    if(md[z].position!=undefined){
                        md[z].x=buttonpos[md[z].position].x
                        md[z].y=buttonpos[md[z].position].y
                        md[z].w=buttonpos[md[z].position].w
                        md[z].h=buttonpos[md[z].position].h
                    }
                }
                
            }
        }
        return arr
    }






























    fetchold(path) {
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();  
            })
            .then(data =>{ 
                    this.DATA=data
                    fetch(this.path+data.door)
                        .then(response=>{
                            return response.json()

                        })
                        .then(data=>{

                            for(let i = 0; i<this.DATA.rooms.length;i++){
                                var md=this.DATA.rooms[i].doors
                                for(let z = 0; z < md.length;z++){
                                    if(md[z].position!=undefined){
                                        md[z].x=data[md[z].position].x
                                        md[z].y=data[md[z].position].y
                                        md[z].w=data[md[z].position].w
                                        md[z].h=data[md[z].position].h
                                    }
                                }
                            }
                        })
                        .catch(error => alert('Failed to fetch data:'+" "+ error)); 
                }
            )  
            .catch(error => console.error('Failed to fetch data:', error)); 
    } 
    data(){
        // alert(this.DATA)
        if(!this.DATA.empty){
            return this.DATA
        }else{
            return false
        }
    }
    
}