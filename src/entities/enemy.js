import {randInt, SpriteClass} from "kontra";
import {generateName} from "../utils/name-generator";
import {BulletPool} from "./bullet-pool";

export class Enemy extends SpriteClass {

    x = 0
    y = 0
    color = 'red'
    width = 20
    height = 40

    pool

    constructor() {
        super();
        this.name = generateName()
        console.log(this.name)

        this.pool = new BulletPool()
        this.children = [this.pool]
    }

    update(dt) {
        // TODO this is just garbage movement
        this.x += randInt(-1, 1)
        this.y = randInt(-1, 1)

        // create bullets
        this.pool.get()
    }


}