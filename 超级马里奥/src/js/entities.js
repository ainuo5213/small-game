
import { loadMario } from "./entities/Mario.js";
import { loadKoopa } from "./entities/Koopa.js";
import { loadGoomba } from "./entities/Goomba.js";

export function LoadEntities() {
    const entityFactory = {};

    function addAs(name) {
        return factory => entityFactory[name] = factory
    }

    return Promise.all(
        [loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa'))])
        .then(() => entityFactory);
}