import { Entity } from "../Entity.js"
import { WalkTrait } from "../traits/WalkTrait.js"
import { loadSpriteSheet } from "../loader.js";

export const LOW_SPEED = 1 / 1500;
export const HIGH_SPEED = 1 / 6000;


export function loadGoomba() {
    return loadSpriteSheet("goomba")
        .then(createGoombaFactory)
}


function createGoombaFactory(goombaSprite) {
    const walkAnime = goombaSprite.animations.get("walk");

    function drawGoomba(context) {
        goombaSprite.draw(walkAnime(this.lifetime), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();

        goomba.size.set(16, 16);
        goomba.vel.x = -30;

        goomba.addTrait(new WalkTrait());

        goomba.draw = drawGoomba;


        return goomba;
    }
}