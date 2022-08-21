import {collides, getCanvas, keyPressed, SpriteClass} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Player} from "./player";
import {BulletGenerator, BulletGeneratorConfig} from "../utils/bullet-generator";

export class Test extends SpriteClass {

    color = 'green'
    difficulty = 1
    bulletPools
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

        const config = new BulletGeneratorConfig()
        config.beams = 3
        config.beamSpread = 120
        config.spinRate = 4
        // config.inverseSpin = 90
        config.originX = this.width / 2
        config.originY = this.height / 2
        config.fireRate = 4
        config.bulletSpeed = Math.random()
        this.generator = new BulletGenerator(config)
        this.bulletPools = this.generator.generate()
        this.children = [this.enemy, ...this.bulletPools]
    }

    matchPoolToEnemy() {
        for (const bulletPool of this.bulletPools) {

        }
    }

    update(dt) {
        // we cant put the pool into the enemy GO because it restricts the area. Maybe this can be remedied somehow?
        for (const bulletPool of this.bulletPools) {
            bulletPool.get()
        }

        if (keyPressed('arrowup')) {
            this.generator.config.beams++
        } else if (keyPressed('arrowdown')) {
            this.generator.config.beams--

        }


        super.update(dt)
    }

}