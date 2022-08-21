import {collides, GameObject, GameObjectClass, Pool, PoolClass, SpriteClass} from "kontra";
import {Sprite} from "kontra";
import {BulletGenerator, BulletGeneratorConfig} from "../utils/bullet-generator";

export class Bullet extends SpriteClass {
    init(properties) {
        super.init({
            width: 3,
            height: 3,
            color: "red",
            ...properties
        })
    }
}

export class BulletPool extends PoolClass {
    maxSize = 1000
    time = 0

    constructor() {
        super({create: () => new Bullet()});
        const config = new BulletGeneratorConfig()
        this.generator = new BulletGenerator(config)
    }

    get() {
        this.time += 1

        super.get({
            x: this.x,
            y: this.y,
            dx: 0,
            dy: 1,
            update: this.generator.generate()

        })
        // if (this.time % 5 === 0)
    }


    checkHit(player) {
        let obj;
        for (let i = this.size; i--;) {
            obj = this.objects[i];
            if (collides(player, obj))
                return true
        }
        return false
    }
}