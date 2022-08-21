import { Player } from "../entities/player";
import { Scene, SceneClass, Text } from "kontra";
import { Level } from "../entities/level";
import {Notebook} from "../entities/notebook";

export class GameScene extends SceneClass {
    constructor() {
        const notebook = new Notebook()
        const level = new Level(notebook)

        const title = Text({ text: 'DeathNote', x: 410, y: 0, color: 'lightgrey', textAlign: 'left', font: '46px Garamond', })
        const properties = {
            id: 'game',
            objects: [level, notebook, title],
            // update: this.update,
        }

        super(properties);
    }

    update(dt) {
        super.update(dt)
    }

    specialFunction() {
        console.log('special')
    }
}