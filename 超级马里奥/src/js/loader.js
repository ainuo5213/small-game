import { createAnim } from "./animation.js";
import { createBackgroundLayer, createrSpriteLayer } from "./layers.js";
import { Level } from "./Level.js";
import UnitStyleSheet from "./UnitStyleSheet.js";

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
    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type,
                });
            }
        }
    }
    // 将地图数据中的每一个背景图层都加载到level对象的tiles中，为以后进行碰撞检测打下数据基础
    backgrounds.forEach(background => {
        background.ranges.forEach(range => {

            // 修改渲染逻辑: 当配置中的range为4位数，则其分别为x位置开始xStart、x方向渲染长度xLen、y位置开始yStart、y方向渲染长度yLen
            //             当配置中的range为2位数，则其分别为x位置开始xStart、y位置开始yStart，此时yLen、xLen均为1
            //             当配置中的range为3位数，则其分别为x位置开始xStart、x方向渲染长度xLen、y位置开始yStart，此时yLen为1
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);
            }
        })
    })
}

export function loadSpriteSheet(name) {
    return loadJson(`/src/sprites/${name}.json`)
        .then(data => Promise.all([data, loadImageAsync(data.tileImgUrl)]))
        .then(([data, image]) => {
            const sheet = new UnitStyleSheet(image, data.tileWidth, data.tileHeight);

            // 存储背景
            if (data.tiles) {
                data.tiles.forEach(tile => {
                    sheet.defineTile(tile.name, tile.index[0], tile.index[1]);
                })
            }

            // 存储马里奥的帧
            if (data.frames) {
                data.frames.forEach(frame => {
                    sheet.define(frame.name, ...frame.rect);
                })
            }
            // 存储带动画的tile
            if (data.animations) {
                data.animations.forEach(animation => {
                    const animCb = createAnim(animation.frames, animation.frameLength);
                    sheet.defineAnim(animation.name, animCb);
                })
            }
            
            return sheet;
        });
}

function loadJson(url) {
    return fetch(url).then(r => r.json());
}

export function loadLevelAsync(name) {
    return loadJson(`/src/levels/${name}.json`)
        .then(data => Promise.all([data, loadSpriteSheet(data.spriteSheet)]))
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
        })
}