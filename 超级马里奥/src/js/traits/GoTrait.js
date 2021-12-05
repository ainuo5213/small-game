import { Trait } from '../Entity.js'

export class GoTrait extends Trait {
    constructor() {
        super('go');

        // 时长
        this.dir = 0;

        // 加速度
        this.acceleration = 400;

        // 减速度
        this.deceleration = 300;

        // 为了避免马里奥无限加速，在这里设置一个非常小的值来控制
        this.dragFactor = 1 / 2500;

        // 行走的距离，用于马里奥动画抽帧，距离%3使马里奥行走的帧动画始终停留在3以内
        this.distance = 0;

        // 马里奥朝向，用于控制马里奥走动之后停止时的朝向
        this.heading = 1;
    }

    // 更新马里奥的x方向的速度（含当前马里奥的方向）
    update = (entity, deltaTime) => {
        const absVelX = Math.abs(entity.vel.x);
        if (this.dir) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
            if (entity.jump) {
                if (!entity.jump.isFalling) {
                    this.heading = this.dir;
                }
            } else {
                this.heading = this.dir;
            }
        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absVelX, this.deceleration * deltaTime);
            entity.vel.x += entity.vel.x > 0 ? -decel : decel;
        }
        else {
            this.distance = 0;
        }

        const drag = this.dragFactor * entity.vel.x * absVelX;
        entity.vel.x -= drag;
        this.distance += absVelX * deltaTime;
    }
}