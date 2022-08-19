import { init, Sprite, GameLoop, initKeys, keyPressed } from 'kontra';
import { Player } from './entities/player'
import { SceneManager } from "./scenes/scene-manager";

let { canvas } = init();

initKeys();

const manager = new SceneManager()


let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    manager.activeScene.update()
  },
  render: function () { // render the game state
    manager.activeScene.render()
  }
});

loop.start();    // start the game
