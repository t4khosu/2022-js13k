import { GameScene } from "./game-scene";
import {Notebook} from "../entities/notebook";
import {onKey, Sprite, Scene} from "kontra";

const alphabet = ['space', ...[...Array(26).keys()].map(c => String.fromCharCode(c + 97))]

export class SceneManager {
    activeScene
    transitionBlock = Sprite({width: 800, height: 600, color: '#2e0f09'})
    transitioning = false
    transitioningTo

    static instance

    constructor() {
        SceneManager.instance = this

        this.notebook = new Notebook(235, 70)

        this.scenes = {
            menu: Scene({
                id: 'menu',
                objects: [this.notebook],
                init: () => {}
            }),
            game: new GameScene(this.notebook),
            gameOver: Scene({
                id: 'gameOver',
                objects: [this.notebook],
                init: () => {
                    this.notebook.numPage = 0
                    this.notebook.currentLine = this.notebook.numLines - 1
                    this.notebook.x = 235
                    this.notebook.initGameOverText()
                }
            })
        }

        this.setScene("menu")

        onKey('enter', () => {
            if(this.transitioning) return

            if(this.activeScene.id == "menu"){
                if(this.notebook.children.at(-1).text.length > 3){
                    this.transitionToScene("game")
                }
                return
            }

            if(this.activeScene.id == "gameOver"){
                this.transitionToScene("game")
                return
            }

            this.notebook.nextLine()
        })

        onKey(alphabet, (e) => {
            if(this.transitioning) return
            this.notebook.onWrite(e.key)
        })
    }

    setScene(sceneKey) {
        this.activeScene?.hide()
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.init()
        this.activeScene.show()
        this.activeScene.update()
        return this.activeScene
    }

    render(){
        this.activeScene.render()
        if(this.transitioning) this.transitionBlock.render()
    }

    update(){
        if(this.transitioning){
            this.transitionBlock.y += 20;
            if(this.transitionBlock.y == 0) this.setScene(this.transitioningTo)
            if(this.transitionBlock.y >= 400) this.transitioning = false
            return
        }

        this.activeScene.update()
    }

    transitionToScene(scene){
        this.transitioning = true
        this.transitioningTo = scene
        this.transitionBlock.y = -700
        this.transitionBlock.dy = 25
    }
}