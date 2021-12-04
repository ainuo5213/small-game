import { Entity } from "./Entity.js"
import { JumpTrait } from './traits/JumpTrait.js'
import { GoTrait } from './traits/GoTrait.js'
import { loadSpriteSheet } from "./loader.js";
import { createAnim } from "./animation.js";


export function createMario() {
    return loadSpriteSheet("mario")
        .then(marioSprite => {
            const mario = new Entity();

            // 设置马里奥的大小
            mario.size.set(14, 16);

            const frames = ["mario-run-1", "mario-run-2", "mario-run-3"];
            const getFrame = createAnim(frames, 10);

            // 马里奥运动时取得其动画帧名字进行对应帧动画对应的切片，进行渲染
            function routeFrame(mario) {
                if (mario.go.dir !== 0) {
                   return getFrame(mario.go.distance);
                }
                return "mario";
            }

            mario.draw = function drawMario(context) {
                marioSprite.draw(routeFrame(this), context, 0, 0, mario.go.heading < 0);
            }

            // 添加马里奥的特征：1、跳跃；2、方向（第五节删除了速度，因为碰撞检测的时候才会对速度特征进行修改，而非update的时候进行修改）
            mario.addTrait(new GoTrait());
            mario.addTrait(new JumpTrait());

            return mario;
        })
}