import {collides, getCanvas, SpriteClass} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Player} from "./player";

export class Level extends SpriteClass {

    color = 'green'
    difficulty = 1
    bulletPool
    enemy
    player

    constructor() {
        super();
        const canvas = getCanvas()
        const padding = 10

        this.x = padding
        this.y = padding

        this.width = canvas.width - 2 * padding
        this.height = canvas.height - 2 * padding

        this.enemy = new Enemy()

        this.bulletPool = new BulletPool()
        this.player = new Player()

        this.children = [this.enemy, this.bulletPool, this.player]
    }

    matchPoolToEnemy() {
        this.bulletPool.x = this.enemy.x + this.enemy.width / 2
        this.bulletPool.y = this.enemy.y + this.enemy.height / 2
    }

    update(dt) {
        // TODO enemy should handle bullets somehow
        // we cant put the pool into the enemy GO because it restricts the area. Maybe this can be remedied somehow?
        this.matchPoolToEnemy()
        this.bulletPool.get()

        //check hits
        if (this.bulletPool.checkHit(this.player))
            this.player.color = 'blue'

        if (collides(this.player, this.enemy))
            this.player.color = 'blue'

        super.update(dt)
    }

}