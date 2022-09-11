import {randInt, SpriteClass} from "kontra";
import {generateNameByDifficulty} from "../utils/name-generator";
import {Game} from "../game";


class RandomWalk {

    start

    constructor(start) {
        this.start = start
    }

    move() {

    }
}

class CircleWalk extends RandomWalk {
    constructor(start) {
        super(start);
    }

    move() {

    }

}

class EnemyHandler extends GameObjectClass {

    enemy
    pools = []
    enemyTick = 0
    difficulty

    constructor(properties, difficulty) {
        super(properties);
        this.difficulty = difficulty
        this.enemy = new Enemy()

    }

    update(dt) {

    }


}


export class Enemy extends SpriteClass {
    x = randInt(100, 200)
    y = randInt(100, 150)
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
            name: generateNameByDifficulty(level.difficulty),
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
    }

    transparency(){
        return Math.min(0.3, this.time / 600)
    }

    onType(row){
        if(this.name != row) return

        this.level.removeChild(this)
        this.level.enemies = this.level.enemies.filter(e => e !== this)
        Game.instance.score++;
        this.level.checkClear()
    }

    update() {
        if(++this.time < 60) return
        if(this.x <= 20 || this.x >= 250) this.dx *= -1
        this.x += this.dx * this.speed
    }
}