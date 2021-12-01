import { Velocity } from "./Velocity.js";

// 特征抽象类，其具体特征和update方法交由子类实现，例如跳跃、速度特征
export class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update = () => {
        console.warn('Unhandled update call in Trait');
    }
}

export class Entity {
    constructor() {
        this.pos = new Velocity(0, 0);
        this.vel = new Velocity(0, 0);

        this.traits = [];
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
        })
    }
}