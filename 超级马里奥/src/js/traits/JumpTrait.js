import { Sides, Trait } from '../Entity.js'

export class JumpTrait extends Trait {
    constructor() {
        super('jump');

        // 是否已经做好跳跃的准备了：<0：已经在跳跃过程中；
        this.ready = 0;

        // 时长，控制马里奥在空中的时间
        this.duration = 0.3;

        // 下降速度
        this.velocity = 200;

        // 参与时间
        this.engageTime = 0;

        this.requestTime = 0;

        this.gracePeriod = 0.1;

        this.speedBoost = 0.3;
    }

    get isFalling() {
        return this.ready < 0;
    }

    start = () => {
        this.requestTime = this.gracePeriod;
    }

    cancel = () => {
        // 结束，设置参与时间为0
        this.engageTime = 0;
        this.requestTime = 0;
    }

    update = (entity, deltaTime) => {
        if (this.requestTime > 0) {
            // ready > 0才可以开始（>0表示马里奥落地了）
            if (this.ready > 0) {
                // 开始，设置参与时间为其时长
                this.engageTime = this.duration;
                this.requestTime = 0;
            }
            this.requestTime -= deltaTime;
        }
        // 更新方法，如果还剩余参与时间就还要更新，然后将参与时间减去已经过去的delta时间
        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }

    obstruct = (entity, side) => {

        // 如果当前达到了地面，就让其等于1，可以再次跳跃
        if (side === Sides.BOTTOM) {
            this.ready = 1;
        }

        else if (side === Sides.TOP) {
            this.cancel();
        }
    }
}