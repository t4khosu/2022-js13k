import {init, GameLoop, initKeys, GameObjectClass, SpriteClass} from 'kontra';
import {SceneManager} from "./scenes/scene-manager";

init();
initKeys();

const manager = new SceneManager()

let loop = GameLoop({
    update: () => {
        manager.activeScene.update()
    },
    render: () => {
        manager.activeScene.render()
    }
});

loop.start();
