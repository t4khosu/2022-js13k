import {init, GameLoop, initKeys} from 'kontra'
import {Game} from "./game"

init()
initKeys()

const game = new Game()

GameLoop({
    update: () => {
        game.update()
    },
    render: () => {
        game.render()
    }
}).start()
