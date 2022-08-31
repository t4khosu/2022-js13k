import { SpriteClass } from "kontra";
import { generateName } from "../utils/name-generator";

export class Enemy extends SpriteClass {

    x = 150
    y = 100
    color = 'red'
    width = 20
    height = 40
    dx = 1
    dy = 0
    speed = 1
    z = 2

    constructor(level) {
        super({level: level});
        this.name = generateName()
    }

    onType(row){
        if(this.name === row){
            this.level.removeChild(this)
            this.level.enemies = this.level.enemies.filter(e => e !== this)
            this.level.checkClear()
        }
    }

    update() {
        (this.x <= 20 || this.x >= 250) && (this.dx *= -1)
        this.x += this.dx * this.speed
    }
}