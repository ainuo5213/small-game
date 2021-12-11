import { Sides, Trait } from '../Entity.js'

export class WalkTrait extends Trait {
    constructor() {
        super('walk');
        this.speed = -30;
    }

    update = (entity) => {
        entity.vel.x = this.speed;
    }

    obstruct = (entity, side) => {
        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }
}