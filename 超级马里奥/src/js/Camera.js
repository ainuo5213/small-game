import { Vector } from "./Math.js"


export default class Camera {
    constructor() {
        this.pos = new Vector(0, 0);
        this.size = new Vector(256, 224);
    }
}