import {Player} from "../character";
import {Scene} from "kontra";

export class GameScene extends Scene{
    constructor() {
        const player = new Player()
        const properties = {
            id: 'game',
            objects: [player]
        }

        super(properties);
    }
}