import {onKey, SceneClass} from "kontra";
import { Level } from "../entities/level";
import {Player} from "../entities/player";

export class GameScene extends SceneClass {
    level = undefined

    constructor(notebook) {
        super({
            id: 'game',
            notebook: notebook,
            player: new Player(),
            objects: [notebook],
        })
    }

    nextLevel(){
        if(this.level) this.remove(this.level)
        this.level = new Level(this)
        this.add(this.level)
    }
}