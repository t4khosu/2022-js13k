import {onKey, SceneClass} from "kontra";
import { Level } from "../entities/level";
import {Player} from "../entities/player";

export class GameScene extends SceneClass {
    level = undefined
    player

    constructor(scene) {
        super({
            id: 'game',
            scene: scene,
            notebook: scene.notebook,
            objects: [scene.notebook],
        })

        this.player = new Player(scene)
    }

    nextLevel(){
        if(this.level) this.remove(this.level)
        this.level = new Level(this)
        this.add(this.level)
    }

    init(){
        this.nextLevel()
        this.player.health = 1
        this.notebook.name ??= this.notebook.children.at(-1).text.substring(2)
        this.notebook.nextLine()
        this.notebook.x = 400
    }
}