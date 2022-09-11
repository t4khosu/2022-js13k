import {SpriteClass, Text} from "kontra";

export class Readable extends SpriteClass {
    color = '#444444'
    width = 7
    height = 7
    text = Text({
        text: this.name,
        color: 'black',
        font: "15px Garamond",
        textAlign: 'center',
        anchor: { x: 0.5, y: 0.5 }
    })

    playerCollision = false
    z = 1

    constructor(x, y, name, level) {
        super({ x: x, y: y, name: name, level: level})
        this.setTextPos()
    }

    setTextPos(){
        this.text.x = this.x + this.width / 2
        this.text.y = this.y + this.height + 7
    }

    render(){
        super.render()
        if(this.playerCollision) this.text.render()
    }

    /**
     * Single readable moves after an explosion in a given radius
     * @param dist {int} - distance
     * @param angle {int} - direction
     */
    spread(dist, angle){
        let r = angle * (Math.PI / 180)
        this.x += Math.cos(r) * dist
        this.y += Math.sin(r) * dist

        this.setTextPos()
    }

    /**
     * Check collision with player. When detected, set flag but only once!
     */
    onPlayerCollisionEnter(){
        if(!this.playerCollision) this.playerCollision = true
    }

    /**
     * Check if not collision with player. When detected, set flag but only once!
     */
    onPlayerCollisionExit(){
        if(this.playerCollision) this.playerCollision = false
    }
}