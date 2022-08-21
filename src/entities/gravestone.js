import { SpriteClass, Text } from "kontra";

export class Gravestone extends SpriteClass {
    width = 15
    height = 25

    color = '#444444'
    text = Text({ text: this.name, x: this.x + this.width / 2, y: this.y - 12, color: 'black', font: "14px Garamond", textAlign: 'center', anchor: { x: 0.5, y: 0.5 } })
    playerCollision = false

    constructor(x, y, name) {
        super({ x: x, y: y, name: name })
    }

    render = () => {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.rect(this.x, this.y + 5, this.width, 5);
        this.context.rect(this.x + 5, this.y, 5, this.height);
        this.context.fill();
        this.playerCollision && this.text.render();
    }

    onPlayerCollisionEnter = () => {
        !this.playerCollision && (this.playerCollision = true)
    }

    onPlayerCollisionExit = () => {
        this.playerCollision && (this.playerCollision = false)

    }
}