import {keyPressed, SpriteClass } from "kontra";
import {SceneManager} from "../scenes/scene-manager";

export class Player extends SpriteClass {
    x = 150
    y = 300
    width = 10
    height = 10
    z = 3
    health = 1
    invincibleTime = 0

    constructor(scene) {
        super({scene: scene});
    }

    update() {
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

    hit(){
        this.health--

        if(this.health == 0) SceneManager.instance.transitionToScene('gameOver')

        this.invincibleTime += 60
        this.color = 'green'
    }
}
