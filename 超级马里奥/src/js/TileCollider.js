import TileResolver from "./TileResolver.js"

export default class TileCollider {
    constructor(tiles) {
        this.tiles = tiles;
        this.tileResolver = new TileResolver(tiles);
    }

    /**
     * 马里奥Y方向的碰撞检测
     * @param {Entity} entity 马里奥实体
     */
    checkY = entity => {

        // 这里不检测马里奥当前这个格子，做一个优化
        let y;
        if (entity.vel.y > 0) {
            y = entity.pos.y + entity.size.y
        } else if (entity.vel.y < 0) {
            y = entity.pos.y
        } else {
            return;
        }

        // 找马里奥当前所在的格子范围，然后对每个格子进行碰撞检测：即马里奥y方向的高度和马里奥自己的高度与匹配出的格子高度对比
        const matches = this.tileResolver.searchByRange(
            entity.pos.x,
            entity.pos.x + entity.size.x,
            y,
            y);
        matches.forEach(match => {
            if (!match) {
                return;
            }

            // 跳过非大地的tile
            if (match.tile.name !== "ground") {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }

    checkX = entity => {
        // 原理同checkY
        let x;
        if (entity.vel.x > 0) {
            x = entity.pos.x + entity.size.x
        } else if (entity.vel.x < 0) {
            x = entity.pos.x
        }
        else {
            return;
        }
        const matches = this.tileResolver.searchByRange(
            x,
            x,
            entity.pos.y,
            entity.pos.y + entity.size.y);
        matches.forEach(match => {
            if (!match) {
                return false;
            }

            if (match.tile.name !== "ground") {
                return false;
            }

            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }
}