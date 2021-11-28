import UnitStyleSheet from "./UnitStyleSheet.js";
import { loadImageAsync, loadLevelAsync } from "./loader.js";

function drawBackground(background, context, unitStyleSheet) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                unitStyleSheet.drawTile(background.tile, context, x, y);
            }
        }
    })
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

loadImageAsync("/src/assets/tiles.png")
    .then(image => {
        // 创建单位图像样式对象，并定义裁剪起始位置来裁剪图像
        const unitStyleSheet = new UnitStyleSheet(image, 16, 16);
        unitStyleSheet.define("ground", 0, 0);
        unitStyleSheet.define("sky", 3, 23);
        loadLevelAsync('1-1')
            .then(level => {
                level.backgrounds.forEach(background => {
                    drawBackground(background, context, unitStyleSheet);
                })
            });
    });