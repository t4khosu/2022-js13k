import {emit, getCanvas, keyPressed, SpriteClass} from "kontra";

export function getPlayer() {
    return currentManager
}

export class Player extends SpriteClass {
    x = 100
    y = 80
    color = '#05b8ff'
    width = 20
    height = 40

    channelTime = 1.5

    update(dt) {
        super.update()
        this.handleCharacterMovement(getCanvas())
    }

    handleCharacterMovement(canvas) {
        if (keyPressed('space')) {
            // TODO add channel time
            emit('clearWord')
        } else {
            if (keyPressed('arrowleft')) {
                if (this.x > 0) {
                    this.x -= 1;
                }
            } else if (keyPressed('arrowright')) {
                if (this.x + this.width < canvas.width) {
                    this.x += 1;
                }
            }
            if (keyPressed('arrowup')) {
                if (this.y > 0) {
                    this.y -= 1;
                }
            } else if (keyPressed('arrowdown')) {
                if (this.y + this.height < canvas.height) {
                    this.y += 1;
                }
            }

        }

    }
}
