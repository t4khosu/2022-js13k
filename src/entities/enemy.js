import { SpriteClass } from "kontra";
import { generateName } from "../utils/name-generator";

export class Enemy extends SpriteClass {

    x = 150
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
    }

    onType(name){
        this.nameArray[this.currentNamePart] === name && (this.currentNamePart++)
    }

    update(dt) {
        this.move()
    }
}