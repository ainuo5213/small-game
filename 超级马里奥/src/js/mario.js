import { Entity } from "./Entity.js"
import { JumpTrait } from './traits/JumpTrait.js'
import { GoTrait } from './traits/GoTrait.js'
import { loadMarioSprite } from "./sprites.js";

export function createMario() {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new Entity();

            // 设置马里奥的大小
            mario.size.set(14, 16);

            mario.draw = function drawMario(context) {
                marioSprite.draw('mario', context, this.pos.x, this.pos.y);
            }

            // 添加马里奥的特征：1、跳跃；2、方向（第五节删除了速度，因为碰撞检测的时候才会对速度特征进行修改，而非update的时候进行修改）
            mario.addTrait(new GoTrait());
            mario.addTrait(new JumpTrait());

            return mario;
        })
}