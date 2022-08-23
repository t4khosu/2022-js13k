import {getCanvas, keyPressed, SpriteClass, collides } from "kontra";

export function getPlayer() {
    return currentManager
}

export class Player extends SpriteClass {
    x = 150
    y = 300
    color = '#000099'
    width = 10
    height = 10
    z = 3

    channelTime = 1.5
    colliders = []

    update(dt) {
        super.update()
        this.handleCharacterMovement(getCanvas())
        this.colliders.forEach(c => collides(this, c) ? c.onPlayerCollisionEnter() : c.onPlayerCollisionExit())
    }

    handleCharacterMovement(canvas) {
        keyPressed('arrowleft') && this.x > 0 && (this.x--)
        keyPressed('arrowright') && this.x + this.width < canvas.width && (this.x++)
        keyPressed('arrowup') && this.y > 0 && (this.y--)
        keyPressed('arrowdown') && this.y + this.height < canvas.height && (this.y++)
    }
}
