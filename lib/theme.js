export class Themes{
    pathindex="themeIndex.json"
    paththeme="theme.json"
    pathroot="./assets/"
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
    filepath(heme, ath,random=0){
        if(this.index[0]){
            var theme=this.get(heme)
            var path=ath.split("%").join("")
            if(theme){
                // alert(eval(`theme`))
                // alert(path)
                var image=eval(`${path}`)
                
                return(this.pathroot+heme+image[Math.floor(random*image.length)])
            }else {
                return false
            }
            
        }else{
            return false
        }
    }
    getImg(theme="original/", asset="%theme%.environments.wood.background",random=0){

        var path=this.filepath(theme,asset,random)
        if(path!=false){

            var pth=path.split('/').join('_').split('.').join('_').split('-').join('_')
            // alert(pth+" "+path)
            if(eval(`this.images.${pth}`)){
                return eval(`this.images.${pth}`)
            }
            eval(`this.images.${pth}= new Image(path)`)
            eval(`this.images.${pth}.src=path`)
            // alert(eval(`this.images.${pth}.src`))
            return eval(`this.images.${pth}`)
        }
        return(new Image())
    }
}