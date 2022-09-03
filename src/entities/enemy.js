import { SpriteClass } from "kontra";
import { generateName } from "../utils/name-generator";

export class Enemy extends SpriteClass {

    x = 150
    y = 100
    width = 30
    height = 40
    dx = 1
    dy = 0
    speed = 1
    z = 2

    constructor(level) {
        super({
            level: level,
            render: () => {
                let ctx = this.context
                ctx.beginPath()
                ctx.arc(15, 15, 15, Math.PI, 2*Math.PI)
                ctx.rect(0, 15, 30, 25)
                ctx.fillStyle = "rgba(255, 0, 0, 0.5)"
                ctx.fill()

                ctx.beginPath()
                ctx.fillStyle = "rgba(50, 50, 50, 0.5)";
                ctx.ellipse(9, 20, 4, 7, -0.1, 0, 2 * Math.PI);
                ctx.ellipse(21, 20, 4, 7, 0.1, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        this.name = generateName()
    }

    onType(row){
        if(this.name === row){
            this.level.removeChild(this)
            this.level.enemies = this.level.enemies.filter(e => e !== this)
            this.level.score++;
            this.level.checkClear()
        }
    }

    update() {
        (this.x <= 20 || this.x >= 250) && (this.dx *= -1)
        this.x += this.dx * this.speed
    }
}