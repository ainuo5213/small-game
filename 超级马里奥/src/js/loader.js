import { createBackgroundLayer, createrSpriteLayer } from "./layers.js";
import { Level } from "./Level.js";
import { loadBackgroundSprites } from "./sprites.js"

export function loadImageAsync(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = function () {
            resolve(img);
        }
        img.src = url;
    });
}

function loadTiles(level, backgrounds) {
    // 将地图数据中的每一个背景图层都加载到level对象的tiles中，为以后进行碰撞检测打下数据基础
    backgrounds.forEach(({ tile, ranges }) => {
        ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    level.tiles.set(x, y, {
                        name: tile,
                    });
                }
            }
        })
    })
}

export function loadLevelAsync(name) {
    return Promise.all([
        fetch(`/src/levels/${name}.json`)
        .then(r => r.json()),
        loadBackgroundSprites(),
    ])
    .then(([levelJson, backgroundSprite]) => {
        const level = new Level();

        // 加载level中的matrix每一个格子的数据到tiles
        loadTiles(level, levelJson.backgrounds);

        // 创建绘制背景的回调
        const backgroundLayer = createBackgroundLayer(level, backgroundSprite);
        level.compositor.layers.push(backgroundLayer);

        // 创建马里奥图像的回调
        const marioSpriteLayer = createrSpriteLayer(level.entities);
        level.compositor.layers.push(marioSpriteLayer);

        return level;
    });
}