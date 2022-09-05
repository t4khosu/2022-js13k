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
    time = 0

    constructor(level) {
        super({
            level: level,
            render: () => {
                let ctx = this.context
                ctx.fillStyle = `rgba(255, 0, 0, ${this.transparency()})`
                ctx.strokeStyle = `rgba(0, 0, 0, ${this.transparency() * 2})`
                ctx.beginPath()
                ctx.arc(15, 15, 15, Math.PI, 2*Math.PI)
                ctx.lineTo(this.width,40);

                for(let i=0; i<=this.width; i+=1){
                    let y = 40 + Math.sin(0.5 * i) * 2;
                    ctx.lineTo(this.width-i,y);
                }
                ctx.lineTo(0, 15);
                ctx.stroke()
                ctx.fill()


                ctx.beginPath()
                ctx.fillStyle = `rgba(50, 50, 50, ${this.transparency()})`;
                ctx.ellipse(9, 20, 4, 7, -0.1, 0, 2 * Math.PI);
                ctx.ellipse(21, 20, 4, 7, 0.1, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        this.name = generateName()
    }

    transparency(){
        return Math.min(0.3, this.time / 600)
    }

    onType(row){
        if(this.name != row) return

        this.level.removeChild(this)
        this.level.enemies = this.level.enemies.filter(e => e !== this)
        this.level.score++;
        this.level.checkClear()
    }

    update() {
        this.time++
        if(this.time < 60) return
        if(this.x <= 20 || this.x >= 250) this.dx *= -1
        this.x += this.dx * this.speed
    }
}