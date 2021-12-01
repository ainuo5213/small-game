import { Trait } from '../Entity.js'

export class VelocityTrait extends Trait {
    constructor() {
        super('velocity');
    }

    update = (entity, deltaTime) => {

        // 改变马里奥的位置
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
}