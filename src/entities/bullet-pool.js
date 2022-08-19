import {collides, GameObject, GameObjectClass, Pool, PoolClass, SpriteClass} from "kontra";
import {Sprite} from "kontra";

// TODO maybe make this into a factory?
export class Bullet extends SpriteClass {
    x = 0
    y = 0
    width = 2
    height = 2
    color = 'red'

}

export class BulletPool extends PoolClass {

    constructor() {
        super({create: Sprite});
    }

    get() {
        // the object will get these properties and values
        const properties = {
            x: this.x,
            y: this.y,
            dx: 2 - Math.random() * 4,
            dy: 2 - Math.random() * 4,
            color: 'red',
            width: 2,
            height: 2,
            ttl: 300,
        }
        super.get(properties)
    }

    checkHit(player){
        let obj;
        for (let i = this.size; i--; ) {
            obj = this.objects[i];
            if (collides(player, obj))
                return true
        }
        return false
    }

}