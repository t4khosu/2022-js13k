import {randInt, SpriteClass} from "kontra";

export class Enemy extends SpriteClass {

    x = 0
    y = 0
    color = 'red'
    width = 20
    height = 40


    name = 'Foo'

    constructor() {
        super();
    }

    update(dt) {
        // TODO this is just garbage movement
        this.x += randInt(-1, 1)
        this.y = randInt(-1, 1)

    }


}