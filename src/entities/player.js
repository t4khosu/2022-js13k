import {keyPressed, SpriteClass } from "kontra";

export class Player extends SpriteClass {
    width = 2
    height = 2
    z = 3
    maxHealth = 10

    health
    invincibleTime
    name
    time = 0

    constructor(game) {
        super({game: game})
    }

    update(){
        this.time++
        if(keyPressed('arrowleft') && this.x > 0) this.x--
        if(keyPressed('arrowright') && this.x + this.width < 350) this.x++
        if(keyPressed('arrowup') && this.y > 0) this.y--
        if(keyPressed('arrowdown') && this.y + this.height < 400) this.y++
        if(this.invincibleTime > 0){
            this.invincibleTime--
        }else{
            this.color = '#695535ee'
        }
    }

    render(){
        let ctx = this.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x-4, this.y-4, 10, 10)

        ctx.fillStyle = '#ffc3a0'
        ctx.fillRect(this.x, this.y, 2, 2)
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
        this.color = '#69553555'
    }
}
