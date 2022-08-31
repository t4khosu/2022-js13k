import {SceneClass} from "kontra";
import { Level } from "../entities/level";
import {Player} from "../entities/player";

export class GameScene extends SceneClass {
    level = undefined

    constructor(notebook) {
        super({
            id: 'game',
            notebook: notebook,
            objects: [notebook],
            player: new Player()
        })
    }

    nextLevel(){
        if(this.level) this.remove(this.level)
        this.level = new Level(this)
        this.player.reset()
        this.add(this.level)
    }

    init(){
        this.nextLevel()
        this.player.reset()
        this.notebook.name ??= this.notebook.children.at(-1).text.substring(2)
        this.notebook.nameText.text = ""
        this.notebook.nextLine()
        this.notebook.x = 400
    }
}