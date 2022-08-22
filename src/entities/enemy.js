import { SpriteClass } from "kontra";
import { generateName } from "../utils/name-generator";

export class Enemy extends SpriteClass {

    x = 150
    y = 50
    color = 'red'
    width = 20
    height = 40
    dx = 1
    dy = 0
    speed = 1

    constructor(level) {
        super({level: level});
        this.name = generateName()
    }

    onType(row){
        this.name === row && this.level.removeChild(this)
    }

    update() {
        (this.x <= 20 || this.x >= 250) && (this.dx *= -1)
        this.x += this.dx * this.speed
    }
}