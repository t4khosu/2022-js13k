import { GameScene } from "./game-scene";
import { StartScene } from "./start-scene";
import {Notebook} from "../entities/notebook";
import {onKey, Sprite} from "kontra";

const alphabet = ['space', ...[...Array(26).keys()].map(c => String.fromCharCode(c + 97))]

export class SceneManager {
    activeScene
    transitionBlock = Sprite({width: 700, height: 600, color: '#2e0f09'})
    transitioning = false

    static instance

    constructor() {
        this.notebook = new Notebook(235, 70)

        this.scenes = {
            menu: new StartScene(this.notebook),
            game: new GameScene(this.notebook),
        }

        this.setScene("menu")

        SceneManager.instance = this

        onKey('enter', () => {
            if(this.transitioning) return

            if(this.activeScene.id == "menu"){
                if(this.notebook.children.at(-1).text.length > 3){
                    this.startTransition()
                }
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
        this.activeScene.show()
        return this.activeScene
    }

    render(){
        this.activeScene.render()
        this.transitioning && this.transitionBlock.render()
    }

    update(){
        if(this.transitioning){
            this.transitionBlock.y += 25;
            if(this.transitionBlock.y == 0) this.transitionUpdate()
            if(this.transitionBlock.y >= 400) this.transitioning = false
            return
        }

        this.activeScene.update()
    }

    startTransition(){
        this.transitioning = true
        this.transitionBlock.y = -600
        this.transitionBlock.dy = 25
    }

    transitionUpdate(){
        if(this.activeScene.id == "menu"){
            this.setScene('game')
            this.notebook.name = this.notebook.children.at(-1).text.substring(2)
            console.log(this.notebook.name)
            this.notebook.nextLine()
            this.notebook.x = 400
        }
        this.activeScene.nextLevel()
        this.activeScene.update()
    }
}