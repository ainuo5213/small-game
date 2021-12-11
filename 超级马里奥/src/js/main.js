import { loadLevelAsync } from "./loaders/level.js";
import Timer from "./Timer.js";
import Camera from "./Camera.js";
import { LoadEntities } from "./entities.js";
import setupKeyboard from "./setupKeyboard.js"
// import { createCollisionLayer } from "./layers.js"

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");


// load函数全部放到一起执行
Promise.all([
    LoadEntities(),
    loadLevelAsync('1-1')
]).then(([entities, level]) => {
    const camera = new Camera();
    const mario = entities.mario();
    const goomba = entities.goomba();
    const koopa = entities.koopa();
    goomba.pos.x = 220;
    koopa.pos.x = 260;
    mario.pos.set(64, 64);
    // mario.addTrait({
    //     Name: 'hackTriate',
    //     spawnTimeout: 0,
    //     obstruct() {
    //     },
    //     update(mario, deltaTime) {
    //         if (this.spawnTimeout > 0.1 && mario.vel.y < 0) {
    //             const spawn = createMario();
    //             spawn.pos.x = mario.pos.x;
    //             spawn.pos.y = mario.pos.y;
    //             spawn.vel.y = mario.vel.x - 200;
    //             level.entities.add(spawn);
    //             this.spawnTimeout = 0;
    //         }
    //         this.spawnTimeout += deltaTime;
    //     }
    // });

    level.entities.add(mario);
    level.entities.add(goomba);
    level.entities.add(koopa);
    // level.compositor.layers.push(createCollisionLayer(level));

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