import {randInt, SpriteClass, Text} from "kontra";

export class Readable extends SpriteClass {
    color = '#444444'
    width = 7
    height = 7
    text = Text({ text: this.name, x: this.x + this.width / 2, y: this.y - 12, color: 'black', font: "14px Garamond", textAlign: 'center', anchor: { x: 0.5, y: 0.5 } })
    playerCollision = false


    constructor(x, y, name, level) {
        super({ x: x, y: y, name: name, level: level})
    }

    render(){
        super.render();
        this.playerCollision && this.text.render();
    }

    spread(dist){
        let x2 = randInt(-dist, dist)
        let y2 = randInt(-dist, dist)


        let s = dist / Math.sqrt(x2*x2+y2*y2)

        this.x += x2 * s
        this.y += y2 * s

        this.text.x = this.x
        this.text.y = this.y - 12
    }

    onPlayerCollisionEnter(){
        !this.playerCollision && (this.playerCollision = true)
    }

    onPlayerCollisionExit(){
        this.playerCollision && (this.playerCollision = false)
    }
}