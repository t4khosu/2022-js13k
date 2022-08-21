import {GameObjectClass} from "kontra";
import {GameScene} from "./game-scene";
import {MenuScene} from "./menu-scene";
import {TestScene} from "./test-scene";

let currentManager = undefined

export function getManager() {
    return currentManager
}

export class SceneManager extends GameObjectClass {
    scenes = {
        menu: new MenuScene(),
        game: new GameScene(),
        test: new TestScene(),
    }

    activeScene

    constructor() {
        super()
        // this.setScene("menu")
        this.setScene("test")
        currentManager = this
    }

    setScene(sceneKey) {
        if (this.activeScene) {
            console.log(`hiding scene ${this.activeScene}`)
            this.activeScene.hide()
        }
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.show()
        return this.activeScene
    }
}