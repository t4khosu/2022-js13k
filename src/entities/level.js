import { collides, getCanvas, SpriteClass } from "kontra";
import { Enemy } from "./enemy";
import { BulletPool } from "./bullet-pool";
import { Player } from "./player";
import { Gravestone } from "./gravestone";

export class Level extends SpriteClass {

    color = '#8da683'
    difficulty = 1
    bulletPool
    enemy
    player
    x = 0
    y = 0
    width = 350

    constructor() {
        super();
        const canvas = getCanvas()

        this.height = canvas.height

        this.enemy = new Enemy()

        this.bulletPool = new BulletPool()
        this.player = new Player()

        let gravestones = [
            new Gravestone(90, 30, 'Tester'),
            new Gravestone(120, 70, 'Random Leiche'),
            new Gravestone(200, 180, 'Peter')
        ]

        this.player.colliders = gravestones


        this.children = [...gravestones, this.enemy, this.bulletPool, this.player]
    }

    matchPoolToEnemy() {
        this.bulletPool.x = this.enemy.x + this.enemy.width / 2
        this.bulletPool.y = this.enemy.y + this.enemy.height / 2
    }

    update(dt) {
        // TODO enemy should handle bullets somehow
        // we cant put the pool into the enemy GO because it restricts the area. Maybe this can be remedied somehow?
        this.matchPoolToEnemy()
        // this.bulletPool.get()

        //check hits
        // if (this.bulletPool.checkHit(this.player))
        //     this.player.color = 'blue'

        // if (collides(this.player, this.enemy))
        //     this.player.color = 'blue'

        super.update(dt)
    }

}