import {GameObjectClass, getCanvas, Sprite, SpriteClass} from "kontra";
import {Word} from "./word";

export class Page extends SpriteClass {
    x = 0
    y = 0
    width = 150
    height = 150
    color = '#fff7b8'

    constructor() {
        super();
        const canvas = getCanvas()
        const word = new Word()
        this.x = canvas.width - this.width
        this.y = canvas.height - this.height

        this.children = [word]
    }

}
