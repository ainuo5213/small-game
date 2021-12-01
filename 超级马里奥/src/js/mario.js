import { Entity } from "./Entity.js"
import { VelocityTrait } from './traits/VelocityTrait.js'
import { JumpTrait } from './traits/JumpTrait.js'
import { loadMarioSprite } from "./sprites.js";

export function createMario() {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new Entity();

            mario.draw = function drawMario(context) {
                marioSprite.draw('mario', context, this.pos.x, this.pos.y);
            }

            // 添加马里奥的特征：1、速度；2、跳跃
            mario.addTrait(new VelocityTrait());
            mario.addTrait(new JumpTrait());

            return mario;
        })
}