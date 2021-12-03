import { loadLevelAsync } from "./loader.js";
import Timer from "./Timer.js";
import Camera from "./Camera.js";
import { createMario } from "./mario.js";
import { createCollisionLayer, createCameraLayer } from "./layers.js"
import setupKeyboard from "./setupKeyboard.js"
import { setupMouseControl } from "./debug.js"

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");


// load函数全部放到一起执行
Promise.all([
    createMario(),
    loadLevelAsync('1-1')
]).then(([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;


    mario.pos.set(64, 64);

    // 加入碰撞检测的layer
    const collisionLayer = createCollisionLayer(level);
    level.compositor.layers.push(collisionLayer);
    const cameraLayer = createCameraLayer(camera);
    level.compositor.layers.push(cameraLayer);

    level.entities.add(mario);

    // 加载键盘绑定事件
    const keyboard = setupKeyboard(mario);

    // 开启监听键盘事件
    keyboard.listenTo(window);

    setupMouseControl(canvas, mario, camera);

    const timer = new Timer(1 / 60);

    timer.update = function (deltaTime) {
        level.update(deltaTime);
        level.compositor.draw(context, camera);
    }

    timer.start();
});