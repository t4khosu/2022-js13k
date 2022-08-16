import {init, Sprite, GameLoop, initKeys, keyPressed} from 'kontra';
import {handleCharacterMovement, character} from './character'

let {canvas} = init();

initKeys();

let sprite = Sprite({
    x: 100,        // starting x,y position of the sprite
    y: 80,
    anchor: {x: 0.5, y: 0.5},

    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
});

let loop = GameLoop({  // create the main game loop
    update: function () { // update the game state
        character.update();

        if (keyPressed('arrowleft')) {
            console.log('left')
            if (sprite.x > canvas.width) {
                sprite.x = +sprite.width;
            }
        } else if (keyPressed('arrowright')) {
            console.log('right')

            if (sprite.x > canvas.width) {
                sprite.x = -sprite.width;
            }
        }

        if (keyPressed('arrowup')) {
            if (sprite.y > canvas.height) {
                sprite.y = -sprite.height;
            }
        } else if (keyPressed('arrowdown')) {
            if (sprite.y > canvas.height) {
                sprite.y = +sprite.height;
            }
        }

    },
    render: function () { // render the game state
        character.render();
    }
});

loop.start();    // start the game
