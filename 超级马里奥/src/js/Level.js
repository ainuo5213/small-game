import { Compositor } from "./Compositor.js"
import TileCollider from "./TileCollider.js"
import { Matrix } from "./Math.js"

export class Level {
    constructor() {
        // 重力加速度
        this.gravity = 2000;

        this.totalTime = 0;

        // 组合器
        this.compositor = new Compositor();

        // 实体列表
        this.entities = new Set();

        // tile格子
        this.tiles = new Matrix();

        // tile格子碰撞检测类
        this.tileCollider = new TileCollider(this.tiles);
    }

    update = deltaTime => {

        // 循环每一个实体，调用其更新方法后，再更新其位置信息，进行碰撞检测（碰撞检测内部会更改实体的位置，如果实体真的发生了碰撞的话）
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);
            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}