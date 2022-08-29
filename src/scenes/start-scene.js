import {SceneClass} from "kontra";

export class StartScene extends SceneClass {
    constructor(notebook) {
        super({
            id: 'menu',
            objects: [notebook]
        })
    }
}