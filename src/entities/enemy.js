import {randInt, SpriteClass} from "kontra";
import {generateNameByDifficulty} from "../utils/name-generator";
import {Game} from "../game";
import {getPatterns} from "./enemy-pattern/enemy-pattern";
import {killSound} from "../utils/sounds";


export class Enemy extends SpriteClass {
    width = 30
    height = 40
    dx = 1
    dy = 1
    speed = 1
    z = 2
    time = 0
    anchor = {x: 0.5, y: 0.5}

    currentPattern = 0
    patternTick = 0

    r = randInt(50, 255)
    g = randInt(50, 255)
    b = randInt(50, 255)
    rot = randInt(-5, 5) / 10

    constructor(level, x, y) {
        super({
            x: x, y: y,
            level: level,
            name: generateNameByDifficulty(level.difficulty),
            render: () => {
                let ctx = this.context
                ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.transparency()})`
                ctx.strokeStyle = `rgba(0, 0, 0, ${this.transparency() * 2})`
                ctx.beginPath()
                ctx.arc(15, 15, 15, Math.PI, 2 * Math.PI)
                ctx.lineTo(this.width, 40);

                for (let i = 0; i <= this.width; i += 1) {
                    let y = 40 + Math.sin(0.5 * i) * 2;
                    ctx.lineTo(this.width - i, y);
                }
                ctx.lineTo(0, 15);
                ctx.stroke()
                ctx.fill()

                ctx.beginPath()
                ctx.fillStyle = `rgba(50, 50, 50, ${this.transparency()})`;
                ctx.ellipse(9, 20, 4, 7, -this.rot, 0, 2 * Math.PI);
                ctx.ellipse(21, 20, 4, 7, this.rot, 0, 2 * Math.PI);
                ctx.fill();
            }
        });

        let patternDif = level.difficulty < 12 ? level.difficulty : level.difficulty - 6
        this.patterns = getPatterns(
            patternDif,
            `rgb(${this.r},${this.g},${this.b})`
        )
        this.patterns.forEach(pattern => {
            this.level.addChild(...pattern.pools)
        })
        this.patterns[this.currentPattern].togglePools(true)

    }

    transparency() {
        return Math.min(0.3, this.time / 600)
    }

    onType(row) {
        if (this.name != row) return

        killSound()
        this.level.removeChild(this)
        this.level.enemies = this.level.enemies.filter(e => e !== this)
        ++Game.instance.score
        this.level.checkClear()
    }

    alignPools(pools) {
        pools.forEach((pool) => {
            pool.originX = this.x
            pool.originY = this.y
        })
    }


    update() {
        ++this.patternTick


        let pattern = this.patterns[this.currentPattern]

        if (this.patternTick > pattern.ticks){
            pattern.togglePools(false)
            this.patternTick = 0
            this.currentPattern = (this.currentPattern +1) % this.patterns.length
            pattern = this.patterns[this.currentPattern]
            pattern.togglePools(true)
        }

        //movement
        if (++this.time > 300){
            pattern.movement(this, this.speed)
        }


        //bullet pools
        const pools = pattern.pools
        this.alignPools(pools)
        pools.forEach((pool) => {
            pool.bulletTick()
            if (pool.checkHit(this.level.player))
                this.level.player.hit()
        })
    }
}