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
            var doorpos=await this.fetch(this.pathroot+arr[x].door)
            for(let y = 0; y < arr[x].rooms.length;y++){
                var md=arr[x].rooms[y].doors
                for(let z = 0; z < md.length;z++){
                    if(md[z].position!=undefined){
                        md[z].x=doorpos[md[z].position].x
                        md[z].y=doorpos[md[z].position].y
                        md[z].w=doorpos[md[z].position].w
                        md[z].h=doorpos[md[z].position].h
                    }
                }
                
            }
        }
        this.index = list
        this.maps = arr
        this.DATA=this.maps[0]
        
    }

    async fetch(path){
        let response = await fetch(path);
        let data = await response.json();
        return data;  
    }

    changeMap(map=1/*map="testmap.json" works aswell */){
        if(typeof map == "string"){

        }else{
            this.indexpos+=map
            this.load()
        }
    }
    load(){
        this.DATA=this.maps[this.indexpos]
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