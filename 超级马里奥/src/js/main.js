import { loadLevelAsync } from "./loader.js";
import { loadBackgroundSprites, loadMarioSprite } from "./sprites.js";
import { Compositor } from "./Compositor.js";
import { createBackgroundLayer, createrSpriteLayer } from "./layers.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevelAsync('1-1')
]).then(([marioSprite, backgroundSprite, level]) => {
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprite);
    const comp = new Compositor();
    comp.layers.push(backgroundLayer);

    const pos = {
        x: 0,
        y: 0
    };

    const spriteLayer = createrSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }

    update();
});