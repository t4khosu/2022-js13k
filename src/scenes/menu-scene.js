import {Player} from "../entities/player";
import {getCanvas, onKey, Scene, SceneClass, Text} from "kontra";
import {getManager} from "./scene-manager";

export class MenuScene extends SceneClass {

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
            objects: [text],
            onShow() {
                console.log('onShow')
                onKey('enter', () => {
                    getManager().setScene('game')
                })
            },
        }

        super(properties);
    }
}