export class Map{
    DATA = {empty:true}
    path = "../maps/testmap.json"
    constructor(){
        this.makemap()
    }
    async makemap(){
        this.fetch(this.path)
        
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