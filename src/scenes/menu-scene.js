import {SceneClass} from "kontra";

export class MenuScene extends SceneClass {
    constructor(notebook) {
        super({
            id: 'menu',
            objects: [notebook]
        })
    }
}