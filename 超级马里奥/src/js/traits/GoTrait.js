import { Trait } from '../Entity.js'

export class GoTrait extends Trait {
    constructor() {
        super('go');

        // 时长
        this.dir = 0;

         // 行走速度
        this.speed = 6000;
    }

    update = (entity, deltaTime) => {
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}