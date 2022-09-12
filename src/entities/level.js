import {collides, SpriteClass, Text} from "kontra";
import {Enemy} from "./enemy";
import {BeamPool} from "./bullet-pool";
import {Gravestone} from "./gravestone";
import {getPatterns} from "./enemy-pattern/pattern";

export class Level extends SpriteClass {
    color = '#8da683'
    width = 350
    height = 400

    static difficulty = 1

    gravestones = []
    enemies
    name

    static score = 0

    constructor(scene) {
        super({
            scene: scene,
            player: scene.player,
            notebook: scene.notebook,
            difficulty: Level.difficulty++,
        });
        this.enemies = [new Enemy(this)]
        this.notebook.currentEnemies = this.enemies
        this.enemies.forEach(e => this.gravestones.push(new Gravestone(e.x + 8, e.y + 10, e.name, this)))

        this.children.push(...this.gravestones, this.player, ...this.enemies)
        this.sort()
    }

    update(dt) {
        this.gravestones.forEach(g => collides(this.player, g) ? g.onPlayerCollisionEnter() : g.onPlayerCollisionExit())
        this.enemies.forEach(e => {
            if (collides(this.player, e) && this.player.invincibleTime == 0) {
                this.player.hit()
                this.notebook.updatePlayerName(this.player)
            }
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