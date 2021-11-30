import { Victor } from "./Vector.js";

export class Entity {
    constructor() {
        this.pos = new Victor(0, 0);
        this.vel = new Victor(0, 0);
    }
}