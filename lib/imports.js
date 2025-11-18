import { Display } from "./gameDisplayer.js";
import { Map } from "./map.js";
export class Game{
    display = new Display(this)
    map = new Map(this)
    init(){

    }
    tick(){
        this.display.tick()
    }

}