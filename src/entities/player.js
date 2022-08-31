import {keyPressed, SpriteClass } from "kontra";
import {SceneManager} from "../scenes/scene-manager";

export class Player extends SpriteClass {
    width = 10
    height = 10
    z = 3
    maxHealth = 10

    health
    invincibleTime

    constructor(scene) {
        super({scene: scene})
        this.reset()
    }

    update(){
        if(keyPressed('arrowleft') && this.x > 0) this.x--
        if(keyPressed('arrowright') && this.x + this.width < 350) this.x++
        if(keyPressed('arrowup') && this.y > 0) this.y--
        if(keyPressed('arrowdown') && this.y + this.height < 400) this.y++
        if(this.invincibleTime > 0){
            this.invincibleTime--
        }else{
            this.color = '#000099'
        }
    }

    reset(){
        this.invincibleTime = 0
        this.health = this.maxHealth
        this.x = 165
        this.y = 350
    }

    hit(){
        this.health--

        if(this.health == 0) SceneManager.instance.transitionToScene('gameOver')

        this.invincibleTime += 60
        this.color = 'green'
    }
}
