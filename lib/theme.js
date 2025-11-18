export class Themes{
    pathindex="themeIndex.json"
    paththeme="theme.json"
    pathroot="../assets/"
    index=[false]
    images={

    }
    themes=[]
    constructor(){
        this.init()
    }
    async init(){
        var list = await this.fetch(this.pathroot+this.pathindex)
        var arr=[]
        for(let i =0; i<list.length;i++){
            arr[i]=await this.fetch(this.pathroot+list[i]+this.paththeme)
        }
        this.index=list
        this.themes=arr
        var path=this.filepath("original/","%theme%.environments.wood.background")
        var pth=path.split('/').join('_').split('.').join('_')
        eval(`this.images.${pth}= new Image(${path})`)
    }
    async fetch(path){
        let response = await fetch(path);
        let data = await response.json();
        return data;  
    }
    get(theme){
        var index=this.index.indexOf(theme)
        if(index>-1){
            return this.themes[index]
        }else {
            return false
        }
    }
    filepath(heme, ath){
        if(this.index[0]){
            var theme=this.get(heme)
            var path=ath.split("%")
            if(theme){
                // alert(eval(`theme`))
                var image=eval(`theme${path[2]}`)
                return(this.pathroot+heme+image)
            }else {
                return false
            }
            
        }else{
            return false
        }
    }
}