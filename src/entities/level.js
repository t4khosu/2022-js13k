import {collides, SpriteClass, Text} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Gravestone} from "./gravestone";

let score = -1
export class Level extends SpriteClass {
    color = '#8da683'
    bulletPool
    width = 350
    height = 400

    gravestones = []
    enemies

    text = Text({x: 8, y: 8})

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

        this.increaseScore()
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

    render(){
        super.render()
        this.text.render()
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

    increaseScore(){
        this.text.text = `Souls: ${++score}`
    }
}