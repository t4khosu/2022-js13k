import {getCanvas, SpriteClass} from "kontra";
import {Enemy} from "./enemy";

export class Level extends SpriteClass {

    color = 'green'
    difficulty = 1

    constructor() {
        super();
        const canvas = getCanvas()
        const padding = 10

        this.x = padding
        this.y = padding

        this.width = canvas.width - 2 * padding
        this.height = canvas.height - 2 * padding

        const enemy = new Enemy()
        this.children = [enemy]

    }

}