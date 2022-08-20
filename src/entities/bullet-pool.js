import { collides, GameObject, GameObjectClass, Pool, PoolClass, SpriteClass } from "kontra";
import { Sprite } from "kontra";

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
    maxSize = 100
    time = 0

    constructor() {
        super({ create: () => new Bullet() });
    }

    get() {
        this.time += 1

        if (this.time % 5 == 0)
            super.get({
                x: this.x,
                y: this.y,
                dx: 2 - Math.random() * 4,
                dy: Math.random() + 2,
                ttl: 150,
            })
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