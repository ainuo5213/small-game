import { loadLevelAsync } from "./loader.js";
import { loadBackgroundSprites } from "./sprites.js";
import Timer from "./Timer.js";
import { Compositor } from "./Compositor.js";
import { createMario } from "./mario.js";
import { createBackgroundLayer, createrSpriteLayer } from "./layers.js";
import { KeyboardState, KEYCODE_SPACE, STATE_KEYDOWN } from './KeyboardState.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");


// load函数全部放到一起执行
Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevelAsync('1-1')
]).then(([mario, backgroundSprite, level]) => {
    const comp = new Compositor();

    // 创建绘制背景的回调
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprite);
    comp.layers.push(backgroundLayer);

    // 模拟重力加速度
    const gravity = 2000;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);


    // 监听键盘的空格事件
    const keyboard = new KeyboardState();

    // 添加键盘空格键的映射，并设置一个回调来使马里奥跳跃
    keyboard.addMapping(KEYCODE_SPACE, keyState => {
        if (keyState === STATE_KEYDOWN) {
            mario.jump.start();
        }
        else {
            mario.jump.cancel();
        }
    });
    keyboard.listenTo(window);

    // 创建马里奥图像的回调
    const marioSpriteLayer = createrSpriteLayer(mario);
    comp.layers.push(marioSpriteLayer);

    const timer = new Timer(1 / 60);

    timer.update = function (deltaTime) {
        mario.update(deltaTime);
        comp.draw(context);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();
});