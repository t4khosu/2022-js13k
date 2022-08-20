import { GameObjectClass } from "kontra";
import { GameScene } from "./game-scene";
import { MenuScene } from "./menu-scene";

let currentManager = undefined

export function getManager() {
    return currentManager
}

export class SceneManager extends GameObjectClass {
    scenes = {}

    activeScene

    constructor() {
        super()
        this.scenes = {
            menu: new MenuScene(),
            game: new GameScene(),
        }
        // this.setScene("menu")
        this.setScene("game")
        currentManager = this
    }

    setScene(sceneKey) {
        this.activeScene?.hide()
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.show()
        return this.activeScene
    }
}