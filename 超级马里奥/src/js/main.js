import { loadLevelAsync } from "./loader.js";
import { loadBackgroundSprites, loadMarioSprite } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer, createrSpriteLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

// load函数全部放到一起执行
Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevelAsync('1-1')
]).then(([marioSprite, backgroundSprite, level]) => {

    // 创建绘制背景的回调
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprite);
    const comp = new Compositor();
    comp.layers.push(backgroundLayer);

    const pos = {
        x: 0,
        y: 0
    };

    // 创建马里奥图像的回调
    const marioSpriteLayer = createrSpriteLayer(marioSprite, pos);
    comp.layers.push(marioSpriteLayer);

    // 更新函数
    function update() {
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }

    update();
});