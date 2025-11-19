import { Display } from "./gameDisplayer.js";
import { Map } from "./map.js";
import { Themes } from "./theme.js";
import { Player } from "./player.js";
export class Game{
    display = new Display(this)
    map = new Map(this)
    themes = new Themes(this)
    player = new Player(this)
    init(){

    }
    tick(){
        this.player.tick()
        this.display.tick()
    }

}