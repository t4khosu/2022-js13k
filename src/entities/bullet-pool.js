import {collides, PoolClass, SpriteClass} from "kontra";
import {degToRad} from "kontra";

export class Bullet extends SpriteClass {
    constructor(color) {
        super({
            color: color,
        });
    }
    init(properties) {
        super.init({
            width: 3,
            height: 3,
            color: this.color,
            ...properties,
            render(){
                let ctx = this.context
                ctx.fillStyle = this.color
                ctx.strokeStyle = `rgba(0, 0, 0, 0.5)`
                ctx.fillRect(0, 0, this.width, this.height)
                ctx.strokeRect(0, 0, this.width, this.height);
            }
        })
    }


    update(){
        super.update()
        if(this.x > 348){
            this.ttl = 0
        }
    }
}

/**
 *
 *              |
 *              |
 *  -----------------------> dx +
 *              |
 *              |
 *              Y    dy +
 */


export class BeamPool extends PoolClass {
    maxSize = 5000

    tick = 0
    rotation = 10

    //====================== bullet configs
    arrays = 1
    arraySpread = 120

    beams = 1

    beamSpread = 10

    originX = 0
    originY = 0

    /**
     *
     * @type {number} spin degrees per tick
     */
    spinRate = 0

    /**
     *
     * @type {number} degree
     */
    inverseSpin = 0

    /**
     *
     * @type {number} every x ticks a bullet is fired
     */
    fireRate = 5

    bulletSpeed = 1

    startAngle = 0

    ttl = 200
    active = false

    constructor(color = "red") {
        super({create: () => new Bullet(color)});
    }

    getBeamConfigs(arrayIndex) {
        const configs = []
        let angle = arrayIndex * this.arraySpread
        const evenBeamAmount = this.beams % 2 === 0
        for (let i = 0; i < this.beams; i++) {
            let startAngle = 0
            if (!evenBeamAmount) {
                if (i === 0) {
                    startAngle = angle
                } else if (i % 2 === 0) {
                    startAngle = angle - (i / 2 * this.beamSpread)
                } else {
                    startAngle = angle + ((i + 1) / 2 * this.beamSpread)
                }
            } else {
                if (i % 2 === 0) {
                    startAngle = angle - (i / 2 * this.beamSpread) - this.beamSpread / 2
                } else {
                    startAngle = angle + ((i - 1) / 2 * this.beamSpread) + this.beamSpread / 2
                }
            }

            const xf = (o) => Math.cos(degToRad(o)) * this.bulletSpeed
            const yf = (o) => -Math.sin(degToRad(o)) * this.bulletSpeed

            const xfd = (o) => Math.cos(degToRad(o + 5)) / 100
            const yfd = (o) => -Math.sin(degToRad(o + 5)) / 100

            const df = (f) => (tick) => {
                let o = startAngle
                if (this.spinRate) {
                    const maxAngle = this.inverseSpin === 0 ? 360 : 2 * this.inverseSpin
                    let tickSpin = tick * this.spinRate % maxAngle
                    if (this.inverseSpin && tickSpin > this.inverseSpin) {
                        tickSpin = (this.inverseSpin - (tickSpin % this.inverseSpin))
                    }
                    o = o + tickSpin
                }
                return f(o)
            }
            const ddf = (tick) => {

            }
            const config = {
                x: this.originX,
                y: this.originY,
                //custom attributes
                dxf: df(xf),
                dyf: df(yf),
                ddxf: df(xfd),
                ddyf: df(yfd),
                fireRate: this.fireRate,
                ttl: this.ttl
            }
            configs.push(config)
        }
        return configs
    }

    _pc() {
        //stump to not crash when removing children
    }

    bulletTick() {
        if (this.active){
            this.tick += 1
            for (let arrayIndex = 0; arrayIndex < this.arrays; arrayIndex++) {
                const configs = this.getBeamConfigs(arrayIndex)
                for (const config of configs) {
                    if (this.tick % this.fireRate === 0) {
                        let dx = config.dx
                        let dy = config.dy
                        if (config.dxf)
                            dx = config.dxf(this.tick)
                        if (config.dyf)
                            dy = config.dyf(this.tick)
                        //get ddf
                        let ddx = config.dx
                        let ddy = config.dy
                        if (config.ddxf)
                            ddx = config.ddxf(this.tick)
                        if (config.ddyf)
                            ddy = config.ddyf(this.tick)

                        super.get({...config, dx: dx, dy: dy, ddy: ddy, ddx: ddx})
                    }
                }
            }

        }
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
