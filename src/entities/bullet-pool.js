import { PoolClass, SpriteClass, Sprite } from "kontra";
import { Sprite } from "kontra";
import kontra from 'kontra'

// TODO maybe make this into a factory?
export class Bullet extends SpriteClass {
    x = 0
    y = 0
    width = 2
    height = 2
    color = 'red'
}

export class BulletPool extends PoolClass {

    create = kontra.Sprite

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

    update() {
        // apply field
        let totalAccelerationX = 0;
        let totalAccelerationY = 0;

        for (let i = 0, field; (field = fields[i]); i++) {
            let vectorX = field.x - this.x;
            let vectorY = field.y - this.y;

            let force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5);

            totalAccelerationX += vectorX * force;
            totalAccelerationY += vectorY * force;
        }

        this.ddx = totalAccelerationX;
        this.ddy = totalAccelerationY;

        this.advance();
    }

}