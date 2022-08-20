import { on, Pool, randInt, Sprite, SpriteClass } from "kontra";
import { generateName } from "../utils/name-generator";
import { BulletPool } from "./bullet-pool";

export class Enemy extends SpriteClass {

    x = 50
    y = 50
    color = 'red'
    width = 20
    height = 40


    constructor() {
        super();
        this.name = generateName()
        this.nameArray = this.name.split(' ')
        this.currentNamePart = 0

        // this.pool = Pool({
        //     create: Sprite
        // })
        // this.children = [this.pool]


    }


    move() {
        // TODO this is just garbage movement
        // this.x += randInt(-1, 1)
        // this.y = randInt(-1, 1)
    }

    wordReact(context, word) {
        // check for name hit
        if (context.nameArray[context.currentNamePart] === word) {
            //
            context.currentNamePart += 1
        }
    }

    update(dt) {
        const context = this
        on('onWordType', (word) => {
            this.wordReact(context, word)
        });
        this.move()

        //TODO create bullets
    }


}