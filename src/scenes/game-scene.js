import { Player } from "../entities/player";
import { Scene, SceneClass, Text } from "kontra";
import { Word } from "../entities/word";
import { Page } from "../entities/page";
import { Level } from "../entities/level";

export class GameScene extends SceneClass {
    constructor() {
        const level = new Level()
        const page = new Page()
        const title = new Text({ text: 'DeathNote', x: 410, y: 0, color: 'lightgrey', textAlign: 'left', font: '46px Garamond', })
        const properties = {
            id: 'game',
            objects: [level, page, title],
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