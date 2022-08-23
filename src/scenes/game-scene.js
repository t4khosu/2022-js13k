import {SceneClass, Text } from "kontra";
import { Level } from "../entities/level";
import {Notebook} from "../entities/notebook";
import {Player} from "../entities/player";

export class GameScene extends SceneClass {
    constructor() {
        super({
            id: 'game',
            notebook: new Notebook(),
            player: new Player(),
        })

        this.level = new Level(this)

        this.objects = [
            this.level,
            this.notebook,
            Text({
                text: 'DeathNote',
                x: 410,
                y: 0,
                color: 'lightgrey',
                textAlign: 'left',
                font: '46px Garamond'
            })]
    }
}