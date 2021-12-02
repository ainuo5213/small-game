import { loadLevelAsync } from "./loader.js";
import Timer from "./Timer.js";
import { createMario } from "./mario.js";
import { createCollisionLayer } from "./layers.js"
import setupKeyboard from "./setupKeyboard.js"

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");


// load函数全部放到一起执行
Promise.all([
    createMario(),
    loadLevelAsync('1-1')
]).then(([mario, level]) => {
    mario.pos.set(64, 64);

    // 加入碰撞检测的layer
    const collisionLayer = createCollisionLayer(level);
    level.compositor.layers.push(collisionLayer);

    level.entities.add(mario);

    // 加载键盘绑定事件
    const keyboard = setupKeyboard(mario);

    // 开启监听键盘事件
    keyboard.listenTo(window);

    ["mousedown", "mousemove"].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            // 如果按了鼠标左键，就将马里奥拖拽（设置速度为0，位置为点击时和鼠标移动时的位置）
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        });
    });

    const timer = new Timer(1 / 60);

    timer.update = function (deltaTime) {
        level.update(deltaTime);
        level.compositor.draw(context);
    }

    timer.start();
});