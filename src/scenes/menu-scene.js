import {Player} from "../character";
import {getCanvas, Scene, Text} from "kontra";

export class MenuScene extends Scene {


    constructor() {
        const canvas = getCanvas()

        let text = Text({
            text: 'Book of death',
            font: '32px Homemade Apple',
            color: 'white',
            x: canvas.width / 2,
            y: canvas.height / 2,
            anchor: {x: 0.5, y: 0.5},
            textAlign: 'center'
        });

        const properties = {
            id: 'menu',
            objects: [text]
        }

        super(properties);
    }
}