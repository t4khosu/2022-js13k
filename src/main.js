import {init, GameLoop, initKeys} from 'kontra'
import {Game} from "./game"
import {musicPlayer} from "./utils/cplayer";

init()
initKeys()
musicPlayer.init()

const game = new Game()

GameLoop({
    update: () => {
        game.update()
    },
    render: () => {
        game.render()
    }
}).start()
