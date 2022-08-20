import { GameObjectClass, getCanvas, Sprite, SpriteClass } from "kontra";
import { Word } from "./word";

export class Page extends SpriteClass {
    x = 400
    y = 60
    width = 220
    height = 330
    color = '#f2dcb1'

    constructor() {
        super();
        const canvas = getCanvas()
        const word = new Word()

        this.children = [word]
    }

}
