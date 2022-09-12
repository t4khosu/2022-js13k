import {collides, randInt, SpriteClass, Text} from "kontra";
import {Enemy} from "./enemy";
import {Gravestone} from "./gravestone";
import {Game} from "../game";

export class Level extends SpriteClass {
    color = '#8da683'
    width = 350
    height = 400

    gravestones = []
    enemies
    name

    scoreText = Text({
        x: 2, y: 2, z: 100, text: `Returned: ${Game.instance.score}`, color: "black"
    })

    constructor(scene) {
        super({
            scene: scene,
            player: scene.player,
            notebook: scene.notebook,
            difficulty: Game.instance.currentDifficulty++,
        });

        this.enemies = [new Enemy(this, randInt(120, 180), randInt(70, 120))]

        // if(this.difficulty > 8) this.enemies.push(new Enemy(this, randInt(50, 80), randInt(200, 230)))
        // if(this.difficulty > 16) this.enemies.push(new Enemy(this, randInt(200, 250), randInt(200, 230)))

        this.notebook.currentEnemies = this.enemies
        this.enemies.forEach(e => this.gravestones.push(new Gravestone(e.x-7, e.y-7, e.name, this)))

        this.children.push(...this.gravestones, this.player, ...this.enemies, this.scoreText)
        this.sort()
        console.log(this.difficulty)
    }

    update(dt) {
        this.gravestones.forEach(g => collides(this.player, g) ? g.onPlayerCollisionEnter() : g.onPlayerCollisionExit())
        this.enemies.forEach(e => {
            if (collides(this.player, e)) this.player.hit()
        })
        super.update(dt)
    }

    sort() {
        this.children.sort((a, b) => a.z - b.z)
    }

    checkClear() {
        if (this.enemies.length == 0) {
            this.children = []
            this.render()
            this.scene.game.transitionToScene("game")
        }
    }
}