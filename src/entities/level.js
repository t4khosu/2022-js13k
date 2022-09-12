import {collides, SpriteClass, Text} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Gravestone} from "./gravestone";
import {Game} from "../game";

export class Level extends SpriteClass {
    color = '#8da683'
    bulletPool
    width = 350
    height = 400

    static difficulty = 1

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
            difficulty: Level.difficulty++,
        });

        this.enemies = [new Enemy(this)]
        this.notebook.currentEnemies = this.enemies
        this.enemies.forEach(e => this.gravestones.push(new Gravestone(e.x + 8, e.y + 10, e.name, this)))

        this.bulletPool = new BulletPool()

        this.children = [...this.gravestones, this.player, ...this.enemies, this.scoreText]
        this.sort()
    }

    update(){
        this.gravestones.forEach(g => collides(this.player, g) ? g.onPlayerCollisionEnter() : g.onPlayerCollisionExit())
        this.enemies.forEach(e => {
            if(collides(this.player, e) && this.player.invincibleTime == 0){
                this.player.hit()
                this.notebook.updatePlayerName(this.player)
            }
        })
        super.update()
    }

    sort(){
        this.children.sort((a, b) =>  a.z - b.z)
    }

    checkClear(){
        if(this.enemies.length == 0){
            this.children = []
            this.render()
            this.scene.game.transitionToScene("game")
        }
    }
}