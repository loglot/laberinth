export class Map{
    DATA = {empty:true}

    path = "../maps/"
    map="original.json"
    constructor(){
        this.makemap()
    }
    async makemap(){
        this.fetch(this.path+this.map)
        
    }
    fetch(path) {
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