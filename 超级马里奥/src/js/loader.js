import { createAnim } from "./animation.js";
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

export function loadJson(url) {
    return fetch(url).then(r => r.json());
}