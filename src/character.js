import {keyPressed, Sprite} from "kontra";

export class Player extends Sprite {
    x = 100
    y = 80
    color = 'red'
    width = 20
    height = 40

    handleCharacterMovement(canvas) {
        if (keyPressed('arrowleft')) {
            console.log('left')
            if (this.x > 0) {
                this.x -= 1;
            }
        } else if (keyPressed('arrowright')) {
            if (this.x < canvas.width) {
                this.x += 1;
            }
        }

        if (keyPressed('arrowup')) {
            if (this.y > 0) {
                this.y -= 1;
            }
        } else if (keyPressed('arrowdown')) {
            if (this.y < canvas.height) {
                this.y += 1;
            }
        }
    }
}
