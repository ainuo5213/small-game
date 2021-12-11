import { Entity, Sides } from "../Entity.js"
import { WalkTrait } from "../traits/WalkTrait.js"
import { loadSpriteSheet } from "../loader.js";

export const LOW_SPEED = 1 / 1500;
export const HIGH_SPEED = 1 / 6000;


export function loadKoopa() {
    return loadSpriteSheet("koopa")
        .then(createKoopaFactory)
}


function createKoopaFactory(koopaSprite) {
    const walkAnime = koopaSprite.animations.get("walk");

    function drawKoopa(context) {
        koopaSprite.draw(walkAnime(this.lifetime), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();

        koopa.size.set(16, 16);
        koopa.vel.x = -30;
        koopa.offset.y = 8;

        koopa.addTrait(new WalkTrait());

        koopa.draw = drawKoopa;


        return koopa;
    }
}