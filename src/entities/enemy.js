import {GameObjectClass, on, Pool, randInt, Sprite, SpriteClass} from "kontra";
import {generateName} from "../utils/name-generator";
import {BulletPool} from "./bullet-pool";


class RandomWalk {

    start

    constructor(start) {
        this.start = start
    }

    move() {

    }
}

class CircleWalk extends RandomWalk {
    constructor(start) {
        super(start);
    }

    move() {

    }

}

class EnemyHandler extends GameObjectClass {

    enemy
    pools = []
    enemyTick = 0
    difficulty

    constructor(properties, difficulty) {
        super(properties);
        this.difficulty = difficulty
        this.enemy = new Enemy()

    }

    update(dt) {

    }


}


export class Enemy extends SpriteClass {

    color = 'red'
    width = 20
    height = 40
    anchor = {x: 0.5, y: 0.5}

    constructor(properties) {
        super(properties);
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