import { Trait } from '../Entity.js'

export class JumpTrait extends Trait {
    constructor() {
        super('jump');

        // 时长
        this.duration = 0.5;

         // 下降速度
        this.velocity = 200;

        // 参与时间
        this.engageTime = 0;
    }

    start = () => {

        // 开始，设置参与时间为其时长
        this.engageTime = this.duration;
    }

    cancel = () => {

        // 结束，设置参与时间为0
        this.engageTime = 0;
    }
 
    update = (entity, deltaTime) => {

        // 更新方法，如果还剩余参与时间就还要更新，然后将参与时间减去已经过去的delta时间
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}