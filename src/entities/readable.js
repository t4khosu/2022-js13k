import {randInt, SpriteClass, Text} from "kontra";

export class Readable extends SpriteClass {
    color = '#444444'
    width = 7
    height = 7
    text = Text({ text: this.name, x: this.x + this.width / 2, y: this.y - 12, color: 'black', font: "14px Garamond", textAlign: 'center', anchor: { x: 0.5, y: 0.5 } })
    playerCollision = false
    z = 1


    constructor(x, y, name, level) {
        super({ x: x, y: y, name: name, level: level})
        this.splits = name.split(' ')
    }

    render(){
        super.render();
        this.playerCollision && this.text.render();
    }

    spread(dist, angle){
        let r = angle * (Math.PI / 180)
        let x2 = Math.cos(r)
        let y2 = Math.sin(r)

        this.x += x2 * dist
        this.y += y2 * dist

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