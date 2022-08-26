import { GameObjectClass } from "kontra";
import { GameScene } from "./game-scene";
import { MenuScene } from "./menu-scene";
import {Notebook} from "../entities/notebook";

let currentManager = undefined

export function getManager() {
    return currentManager
}

export class SceneManager extends GameObjectClass {
    scenes = {}
    activeScene

    constructor() {
        super()
        let notebook = new Notebook(235, 70)

        this.scenes = {
            menu: new MenuScene(notebook),
            game: new GameScene(notebook),
        }
        this.setScene("menu")
        currentManager = this
    }

    setScene(sceneKey) {
        this.activeScene?.hide()
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.show()
        return this.activeScene
    }
}