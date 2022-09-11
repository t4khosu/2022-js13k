import {collides, getCanvas, keyPressed, offKey, SpriteClass} from "kontra";
import {Enemy} from "./enemy";
import {BeamPool} from "./bullet-pool";

export class Test extends SpriteClass {

    color = 'green'
    difficulty = 1
    pool
    enemy

    constructor() {
        super();
        const canvas = getCanvas()
        const padding = 10

        // this.x = padding
        // this.y = padding

        this.width = canvas.width
        this.height = canvas.height

        this.enemy = new Enemy({x: this.width / 2, y: this.height / 2})

        // const config = new BulletGeneratorConfig()
        // config.beams = 3
        // config.beamSpread = 120
        // config.spinRate = 4
        // // config.inverseSpin = 90
        // config.originX = this.width / 2
        // config.originY = this.height / 2
        // config.fireRate = 4
        // config.bulletSpeed = Math.random()
        // this.generator = new BulletGenerator(config)
        // this.bulletPools = this.generator.generate()
        // this.children = [this.enemy, ...this.bulletPools]

        this.pool = new BeamPool()
        this.pool.beams = 3
        this.pool.beamSpread = 120
        this.pool.spinRate = 4
        // this.pool.inverseSpin = 90
        this.pool.originX = this.width / 2
        this.pool.originY = this.height / 2
        // this.pool.fireRate = 4
        this.pool.bulletSpeed = 1
        this.children = [this.enemy, this.pool]
    }

    matchPoolToEnemy() {
        for (const bulletPool of this.bulletPools) {

        }
    }

    update(dt) {
        // we cant put the pool into the enemy GO because it restricts the area. Maybe this can be remedied somehow?
        this.pool.get()

        if (keyPressed('arrowup')) {
            this.pool.arrays++
            console.log(this.pool.arrays)
        } else if (keyPressed('arrowdown')) {
            this.pool.arrays--
            console.log(this.pool.arrays)
        }
        if (keyPressed('arrowleft')) {
            this.pool.bulletSpeed += 0.2
            console.log(this.pool.bulletSpeed)
        } else if (keyPressed('arrowright')) {
            this.pool.bulletSpeed -= 0.2
            console.log(this.pool.bulletSpeed)
        }


        super.update(dt)
    }

}