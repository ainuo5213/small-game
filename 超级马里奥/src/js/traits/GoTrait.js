import { Trait } from '../Entity.js'

export class GoTrait extends Trait {
    constructor() {
        super('go');

        // 时长
        this.dir = 0;

         // 行走速度
        this.speed = 6000;
    }

    // 更新马里奥的x方向的速度（含当前马里奥的方向）
    update = (entity, deltaTime) => {
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}