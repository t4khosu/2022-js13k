import {Notebook} from "./entities/notebook";
import {Sprite, Scene, SceneClass, onKey} from "kontra";
import {Player} from "./entities/player";
import {Level} from "./entities/level";

const alphabet = ['space', ...[...Array(26).keys()].map(c => String.fromCharCode(c + 97))]

class GameScene extends SceneClass{
    level
    score

    constructor(notebook) {
        super({
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

    transition(){
        this.nextLevel()
        this.player.reset()
        this.notebook.name ??= this.notebook.children.at(-1).text.substring(2)
        this.notebook.playerName.text = ""
        this.notebook.lineBreak()
        this.notebook.x = 400
    }
}

export class Game {
    activeScene

    transitionBlock = Sprite({width: 800, height: 600, color: '#2e0f09'})
    transitioning = false
    transitioningTo = "menu"

    notebook = new Notebook(235, 70)

    scenes = {
        menu: Scene({
            objects: [this.notebook],
            transition(){}
        }),
        game: new GameScene(this.notebook),
        gameOver: Scene({
            objects: [this.notebook],
            transition(){this.notebook.initGameOver()}
        })
    }


    constructor() {
        this.transitionToScene("menu")

        onKey('enter', () => {
            if(this.transitioning) return

            switch(this.transitioningTo){
                case "menu":
                    if(this.notebook.children.at(-1).text.length > 3){
                        this.transitionToScene("game")
                    }
                    return
                case "gameOver":
                    this.transitionToScene("game")
                    return
            }

            this.notebook.lineBreak()
        })


        onKey(alphabet, (e) => {
            if(this.transitioning) return
            this.notebook.type(e.key)
        })
    }

    setScene(sceneKey) {
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.transition()
        return this.activeScene
    }

    render(){
        this.activeScene?.render()
        if(this.transitioning) this.transitionBlock.render()
    }

    update(){
        if(this.transitioning){
            this.transitionBlock.y += 20;
            if(this.transitionBlock.y == 0) this.setScene(this.transitioningTo)
            if(this.transitionBlock.y >= 400) this.transitioning = false
            return
        }

        this.activeScene?.update()
    }

    transitionToScene(sceneName){
        this.transitioning = true
        this.transitioningTo = sceneName
        this.transitionBlock.y = -700
        this.transitionBlock.dy = 20
    }
}