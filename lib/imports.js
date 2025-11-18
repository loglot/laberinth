import { Display } from "./gameDisplayer.js";
import { Map } from "./map.js";
import { Themes } from "./theme.js";
export class Game{
    display = new Display(this)
    map = new Map(this)
    themes = new Themes(this)
    init(){

    }
    tick(){
        this.display.tick()
    }

}