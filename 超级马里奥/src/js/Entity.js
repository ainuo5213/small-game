import { Velocity } from "./Velocity.js";

export class Entity {
    constructor() {
        this.pos = new Velocity(0, 0);
        this.vel = new Velocity(0, 0);
    }
}