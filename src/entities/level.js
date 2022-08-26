import {collides, getCanvas, SpriteClass, randInt} from "kontra";
import {Enemy} from "./enemy";
import {BulletPool} from "./bullet-pool";
import {Player} from "./player";
import {Gravestone} from "./gravestone";
import {generateName} from "../utils/name-generator";
import {Readable} from "./readable";

export class Level extends SpriteClass {

    color = '#8da683'
    difficulty = 1
    bulletPool
    enemies
    width = 350
    height = 400

    constructor(scene) {
        super({
            scene: scene,
            player: scene.player,
            notebook: scene.notebook,
        });

        this.enemies = [new Enemy(this)]
        this.notebook.enemies = this.enemies

        let gravestones = []
        this.enemies.forEach(e => gravestones.push(new Gravestone(e.x, e.y - 10, e.name, this)))
        this.player.colliders = gravestones

        this.bulletPool = new BulletPool()

        this.children = [...gravestones, this.player, ...this.enemies]
        this.sort()
    }

    sort(){
        this.children.sort((a, b) =>  a.z - b.z)
    }

    nextLevel(){
        this.notebook.newLine()
        this.scene.objects[0] = new Level(this.scene)
    }

    checkClear(){
        // TODO
    }
}