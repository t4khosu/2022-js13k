import {SceneClass, Sprite } from "kontra";
import { Level } from "../entities/level";
import {Player} from "../entities/player";

export class GameScene extends SceneClass {
    transitionBlock = Sprite({width: 700, height: 600, color: '#2e0f09'})
    transitioning = false
    level = undefined

    constructor(notebook) {
        super({
            id: 'game',
            notebook: notebook,
            player: new Player(),
            objects: [notebook],
        })
    }

    update() {
        if(this.transitioning){
            this.transitionBlock.y += 25;
            if(this.transitionBlock.y == 0) this.transitionUpdate()
            if(this.transitionBlock.y >= 400) this.transitioning = false
        }
        super.update()
    }

    startNewLevel(){
        this.transitioning = true
        this.transitionBlock.y = -600
        this.transitionBlock.dy = 25
    }

    transitionUpdate(){
        this.notebook.x = 400
        this.notebook.newLine()
        this.level = new Level(this)
        this.add(this.level)
    }

    render(){
        super.render()
        this.transitioning && this.transitionBlock.render()
    }
}