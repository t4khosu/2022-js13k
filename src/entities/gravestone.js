import {Readable} from "./readable";
import {randInt} from "kontra";

export class Gravestone extends Readable {
    width = 15
    height = 25

    dx = 2
    time = 0

    render(){
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.rect(this.x, this.y + 5, this.width, 5);
        this.context.rect(this.x + 5, this.y, 5, this.height);
        this.context.fill();
        this.playerCollision && this.text.render();
    }

    update(){
        if(this.splits.length == 1) return

        this.time++ % 5 == 0 && this.time < 120 && (this.x += (this.dx *= -1))

        if(this.time == 121){
            let l = this.level
            l.removeChild(this)

            let spin = randInt(0, 360)
            this.splits.forEach((namePartial, i) => {
                let r = new Readable(this.x, this.y, namePartial)
                l.addChild(r)
                l.player.colliders.push(r)
                let angle = (spin + (360 / this.splits.length) * (i+1)) % 360
                r.spread(80, angle)
            })
            l.sort()
        }

    }
}