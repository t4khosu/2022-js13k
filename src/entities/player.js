import {keyPressed, SpriteClass, collides } from "kontra";

export class Player extends SpriteClass {
    x = 150
    y = 300
    width = 10
    height = 10
    z = 3
    health = 10
    invincibleTime = 0

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
        this.invincibleTime += 60
        this.color = 'green'
        console.log(this.health)
    }
}
