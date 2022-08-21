import {SceneClass} from "kontra";
import {Test} from "../entities/test";

export class TestScene extends SceneClass {
    constructor() {
        const test = new Test()
        const properties = {
            id: 'game',
            objects: [test]
            // update: this.update,
        }

        super(properties);
    }

    update(dt) {
        super.update(dt)
    }

}