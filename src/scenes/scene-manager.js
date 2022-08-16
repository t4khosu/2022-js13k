import {GameObjectClass} from "kontra";
import {GameScene} from "./game-scene";
import {MenuScene} from "./menu-scene";

export class SceneManager extends GameObjectClass {
    scenes = {
        menu: new MenuScene(this), game: new GameScene(this),
    }

    activeScene
    canvas

    constructor(canvas) {
        super()
        this.canvas = canvas
        this.setScene("menu")
    }

    setScene(sceneKey) {
        if (this.activeScene) {
            this.activeScene.hide()
        }
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.show()
        return this.activeScene
    }
}