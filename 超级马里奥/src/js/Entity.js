import { Vector } from "./Math.js";
import BoundingBox from "./BoundingBox.js";

export const Sides = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom"),
    RIGHT: Symbol("right"),
    LEFT: Symbol("left")
}

// 特征抽象类，其具体特征和update方法交由子类实现，例如跳跃、速度特征
export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update = () => {
        console.warn('Unhandled update call in Trait');
    }

    obstruct = (entity, side) => {
    }
}

export class Entity {
    constructor() {
        this.pos = new Vector(0, 0);
        this.vel = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.traits = [];
        this.offset = new Vector(0, 0);
        this.lifetime = 0;
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    }

    addTrait = trait => {

        // 添加实体的特征
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update = deltaTime => {

        // 更新时，将该实体的每一个特征中update方法执行一遍
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
        this.lifetime += deltaTime;
    }

    obstruct = side => {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        })
    }
}