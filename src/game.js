import {Notebook} from "./entities/notebook";
import {Sprite, Scene, SceneClass, onKey} from "kontra";
import {Player} from "./entities/player";
import {Level} from "./entities/level";
import {musicPlayer} from "./utils/cplayer";
import {clickSound} from "./utils/sounds";
const alphabet = ['space', ...[...Array(26).keys()].map(c => String.fromCharCode(c + 97))]

class GameScene extends SceneClass{
    level

    constructor(game) {
        super({
            game: game,
            notebook: game.notebook,
            objects: [game.notebook],
            player: game.player
        })
        this.player.reset()
    }

    nextLevel(){
        this.level = new Level(this)
        this.player.x = 165
        this.player.y = 350
        this.player.health = Math.min(this.player.health+1, this.player.maxHealth)
        this.add(this.level)
    }

    /**
     * Every Scene requires this function. During a scene transition there is a short moment the complete scene is
     * hidden. During this moment the transition function is called to initialise the newly loaded scene.
     */
    transition(){
        this.nextLevel()
        this.notebook.updatePlayerName(this.player)
        this.notebook.x = 400
    }
}

export class Game {
    activeScene

    transitionBlock = Sprite({width: 800, height: 600, color: '#2e0f09'})
    transitioning
    transitioningTo

    musicPlaying = false

    notebook = new Notebook(235, 70)
    player = new Player(this)

    currentDifficulty = 1

    score = 0

    scenes = {
        menu: Scene({
            objects: [this.notebook],
            transition(){}
        }),
        game: new GameScene(this),
        gameOver: Scene({
            objects: [this.notebook],
            game: this,
            transition(){this.game.notebook.initGameOver(this.game.score)}
        })
    }

    static instance

    constructor() {
        this.transitionToScene("menu")

        onKey('enter', () => {
            if(this.transitioning) return

            // current scene = this.transitionTo
            switch(this.transitioningTo){
                case "menu":
                    if(this.notebook.children.at(-1).text.length > 3){
                        this.player.name ??= this.notebook.currentText().text.substring(2)
                        this.transitionToScene("game")
                        this.notebook.lineBreak()
                    }
                    return

                case "gameOver":
                    this.scenes.game = new GameScene(this)
                    this.currentDifficulty = 1
                    this.score = 0
                    this.transitionToScene("game")
                    this.notebook.updatePlayerName(this.player)
                    this.notebook.lineBreak()
                    return
            }

            this.notebook.lineBreak()
        })

        onKey(alphabet, (e) => {
            if(this.transitioning || this.transitioningTo == "gameOver") return
            clickSound()
            this.notebook.type(e.key)
        })

        Game.instance = this
    }

    /**
     * Change scene to other scene defined in `this.scenes`
     * @param sceneKey {string}
     * @returns {Scene}
     */
    setScene(sceneKey) {
        this.activeScene = this.scenes[sceneKey]
        this.activeScene.transition()
        this.activeScene.update()
        return this.activeScene
    }

    /**
     * Run a transition (set its flag = true) to change the scene.
     * @param sceneName {string}
     */
    transitionToScene(sceneName){
        this.transitioning = true
        this.transitioningTo = sceneName
        this.transitionBlock.y = -600
        this.transitionBlock.dy = 20
        musicPlayer.play('wind')
    }

    render(){
        this.activeScene?.render()
        if(this.transitioning) this.transitionBlock.render()
    }

    update(){
        if(this.transitioning){
            this.transitionBlock.y += 20;
            if(this.transitionBlock.y == 0) this.setScene(this.transitioningTo)
            if(this.transitionBlock.y >= 400) {
                if(!this.musicPlaying && this.transitioningTo == 'game'){
                    this.musicPlaying = true
                    musicPlayer.play('bgmusic')
                }
                this.transitioning = false
            }
            return
        }

        this.activeScene?.update()
    }
}