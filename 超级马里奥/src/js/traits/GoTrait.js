import { Trait } from '../Entity.js'

export class GoTrait extends Trait {
    constructor() {
        super('go');

        // 时长
        this.dir = 0;

        // 行走速度
        this.speed = 6000;

        // 行走的距离，用于马里奥动画抽帧，距离%3使马里奥行走的帧动画始终停留在3以内
        this.distance = 0;

        // 马里奥朝向，用于控制马里奥走动之后停止时的朝向
        this.heading = 1;
    }

    // 更新马里奥的x方向的速度（含当前马里奥的方向）
    update = (entity, deltaTime) => {
        entity.vel.x = this.speed * this.dir * deltaTime;

        if (this.dir) {
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        }
        else {
            this.distance = 0;
        }
    }
}