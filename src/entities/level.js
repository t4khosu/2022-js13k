import {collides, getCanvas, SpriteClass, randInt} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Player} from "./player";
import {Gravestone} from "./gravestone";
import {generateName} from "../utils/name-generator";

export class Level extends SpriteClass {

    color = '#8da683'
    difficulty = 1
    bulletPool
    enemy
    player
    x = 0
    y = 0
    width = 350
    height = 400

    constructor(notebook) {
        super();

        this.enemy = new Enemy(this)
        notebook.enemies.push(this.enemy)

        this.bulletPool = new BulletPool()
        this.player = new Player()

        let gravestone = new Gravestone(150, 50, this.enemy.name)

        this.player.colliders = [gravestone]


        this.children = [gravestone, this.enemy, this.bulletPool, this.player]
    }

    matchPoolToEnemy() {
        this.bulletPool.x = this.enemy.x + this.enemy.width / 2
        this.bulletPool.y = this.enemy.y + this.enemy.height / 2
    }

    update() {
        // TODO enemy should handle bullets somehow
        // we cant put the pool into the enemy GO because it restricts the area. Maybe this can be remedied somehow?
        this.matchPoolToEnemy()
        // this.bulletPool.get()

        //check hits
        // if (this.bulletPool.checkHit(this.player))
        //     this.player.color = 'blue'

        // if (collides(this.player, this.enemy))
        //     this.player.color = 'blue'

        super.update()
    }

}