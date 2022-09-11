import {Readable} from "./readable";
import {randInt} from "kontra";

export class Gravestone extends Readable {
    width = 15
    height = 25

    dx = 2
    time = 0

    splits = this.name.split(' ')
    explode = false

    constructor(x, y, name, level) {
        super(x, y, name, level);
        this.setTextPos()
        this.explode = level.difficulty > randInt(2, 20)
    }

    render(){
        let ctx = this.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y + 5, this.width, 5)
        ctx.fillRect(this.x + 5, this.y, 5, this.height)
        if(this.playerCollision) this.text.render()
    }

    update(){
        if(!this.explode) return

        if(this.time++ % 5 == 0 && this.time < 120) this.x += (this.dx *= -1)

        if(this.time == 121){
            let l = this.level
            l.removeChild(this)

            let spin = randInt(0, 360)
            this.splits.forEach((namePartial, i) => {
                let r = new Readable(this.x, this.y, namePartial)
                l.gravestones.push(r)
                l.addChild(r)
                let angle = (spin + (360 / this.splits.length) * (i+1)) % 360
                r.spread(randInt(20, 70), angle)
            })
            l.sort()
        }
    }
}