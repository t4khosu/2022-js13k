import {keyPressed, SpriteClass } from "kontra";

export class Player extends SpriteClass {
    width = 10
    height = 10
    z = 3
    maxHealth = 1

    health
    invincibleTime
    name

    constructor(game) {
        super({game: game})
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

    /**
     * Reset initial player state
     */
    reset(){
        this.invincibleTime = 0
        this.health = this.maxHealth
    }

    /**
     * Call on enemy or bullet collision
     */
    hit(){
        if(--this.health == 0) this.game.transitionToScene('gameOver')
        this.invincibleTime += 60
        this.color = 'green'
    }
}
