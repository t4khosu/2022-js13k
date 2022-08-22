import {SceneClass, Text } from "kontra";
import { Level } from "../entities/level";
import {Notebook} from "../entities/notebook";

export class GameScene extends SceneClass {
    constructor() {
        const notebook = new Notebook()
        const level = new Level(notebook)
        const title = Text({
            text: 'DeathNote',
            x: 410,
            y: 0,
            color: 'lightgrey',
            textAlign: 'left',
            font: '46px Garamond'
        })

        super({
            id: 'game',
            objects: [level, notebook, title],
        })
    }
}