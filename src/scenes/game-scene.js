import {Player} from "../entities/player";
import {Scene} from "kontra";

export class GameScene extends Scene {
    constructor() {
        const player = new Player()
        const properties = {
            id: 'game',
            objects: [player],
            // update: this.update,
        }

        super(properties);
    }

    update(dt) {
        console.log('gamescene update')
        super.update(dt)
    }

    specialFunction() {
        console.log('special')
    }
}