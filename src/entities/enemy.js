import {GameObjectClass, randInt, SpriteClass} from "kontra";
import {generateNameByDifficulty} from "../utils/name-generator";
import {Game} from "../game";
import {getPatterns} from "./enemy-pattern/enemy-pattern";


export class Enemy extends SpriteClass {
    x = randInt(100, 200)
    y = randInt(100, 150)
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

    constructor(level) {
        super({
            level: level,
            name: generateNameByDifficulty(level.difficulty),
            render: () => {
                let ctx = this.context
                ctx.fillStyle = `rgba(255, 0, 0, ${this.transparency()})`
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
                ctx.ellipse(9, 20, 4, 7, -0.1, 0, 2 * Math.PI);
                ctx.ellipse(21, 20, 4, 7, 0.1, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        this.patterns = getPatterns(level.difficulty)
        this.level.addChild(...this.patterns[this.currentPattern].pools)
    }

    transparency() {
        return Math.min(0.3, this.time / 600)
    }

    onType(row) {
        if (this.name != row) return

        this.level.removeChild(this)
        this.level.enemies = this.level.enemies.filter(e => e !== this)
        Game.instance.score++;
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
        if (++this.time < 60) return

        let pattern = this.patterns[this.currentPattern]

        if (this.patternTick > pattern.ticks){
            this.level.removeChild(...pattern.pools)
            this.patternTick = 0
            this.currentPattern = this.currentPattern +1 % this.patterns.length
            pattern = this.patterns[this.currentPattern]
            this.level.addChild(...pattern.pools)
        }

        //movement
        pattern.movement(this, this.speed)

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