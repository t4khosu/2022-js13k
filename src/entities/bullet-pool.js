import {PoolClass, SpriteClass} from "kontra";
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

    create = () => new Bullet()

    get() {
        // the object will get these properties and values
        const properties = {
            x: 100,
            y: 200,
            width: 20,
            height: 40,
            color: 'red',

            // pass Infinity for ttl to prevent the object from being reused
            // until you set it back to 0
            ttl: 50
        }
        super.get(properties)
    }

}