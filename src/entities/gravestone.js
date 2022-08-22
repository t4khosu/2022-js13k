import {Readable} from "./readable";

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
        this.time++ % 5 == 0 && this.time < 120 && (this.x += (this.dx *= -1))

        if(this.time == 121){
            this.level.removeChild(this)

            let r = []
            this.name.split(' ').forEach(s => r.push(new Readable(this.x, this.y, s)))

            r.forEach(l => {
                this.level.addChild(r)
                this.level.player.colliders.push(l)
                l.spread(80)
            })
        }
    }

}