import { createLevelLoader } from "./loaders/level.js";
import Timer from "./Timer.js";
import Camera from "./Camera.js";
import { LoadEntities } from "./entities.js";
import setupKeyboard from "./setupKeyboard.js"
import { createCollisionLayer } from "./layers.js"

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

async function loadGame() {
    let entities = await LoadEntities();
    let loadLevelAsync = createLevelLoader(entities);
    let level = await loadLevelAsync("1-1"); 

    return [entities, level]
}


// load函数全部放到一起执行
loadGame()
.then(([entities, level]) => {
    const camera = new Camera();
    const mario = entities.mario();
    mario.pos.set(64, 64);

    level.entities.add(mario);
    level.compositor.layers.push(createCollisionLayer(level));

    // 加载键盘绑定事件
    const keyboard = setupKeyboard(mario);

    // 开启监听键盘事件
    keyboard.listenTo(window);

    // setupMouseControl(canvas, mario, camera);

    const timer = new Timer(1 / 60);

    timer.update = function (deltaTime) {
        level.update(deltaTime);
        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }
        level.compositor.draw(context, camera);
    }

    timer.start();
});