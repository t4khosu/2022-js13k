import {keyPressed, Sprite} from "kontra";


let character = Sprite({
    x: 100,        // starting x,y position of the sprite
    y: 80,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
});

let handleCharacterMovement = (canvas) => {
    if (keyPressed('arrowleft')) {
        if (character.x > canvas.width) {
            character.x = +character.width;
        }
    } else if (keyPressed('arrowright')) {
        if (character.x > canvas.width) {
            character.x = -character.width;
        }
    }

    if (keyPressed('arrowup')) {
        if (character.y > canvas.height) {
            character.y = -character.height;
        }
    } else if (keyPressed('arrowdown')) {
        if (character.y > canvas.height) {
            character.y = +character.height;
        }
    }
}


export {character, handleCharacterMovement}