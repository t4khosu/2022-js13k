import {collides, getCanvas, SpriteClass, randInt} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Player} from "./player";
import {Gravestone} from "./gravestone";
import {generateName} from "../utils/name-generator";
import {Readable} from "./readable";
import {SceneManager} from "../scenes/scene-manager";

export class Level extends SpriteClass {
    color = '#8da683'
    bulletPool
    width = 350
    height = 400

    gravestones = []
    enemies

    constructor(scene) {
        super({
            scene: scene,
            player: scene.player,
            notebook: scene.notebook,
        });

        this.enemies = [new Enemy(this)]
        this.notebook.enemies = this.enemies
        this.enemies.forEach(e => this.gravestones.push(new Gravestone(e.x, e.y - 10, e.name, this)))

        this.bulletPool = new BulletPool()

        this.children = [...this.gravestones, this.player, ...this.enemies]
        this.sort()
    }

    update(){
        this.gravestones.forEach(g => collides(this.player, g) ? g.onPlayerCollisionEnter() : g.onPlayerCollisionExit())
        this.enemies.forEach(e => {
            if(collides(this.player, e) && this.player.invincibleTime == 0){
                this.player.hit()
                this.notebook.addHit(this.player.health, this.player.maxHealth)
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
            SceneManager.instance.transitionToScene("game")
        }
    }
}