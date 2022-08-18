import {Player} from "../entities/player";
import {Scene, SceneClass} from "kontra";
import {Word} from "../entities/word";
import {Page} from "../entities/page";
import {Level} from "../entities/level";

export class GameScene extends SceneClass {
    constructor() {
        const level = new Level()
        const player = new Player()
        const page = new Page()
        const properties = {
            id: 'game',
            objects: [level, player, page],
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