import UnitStyleSheet from "./UnitStyleSheet.js";
import { loadImageAsync } from "./loader.js";

export function loadBackgroundSprites() {
    return loadImageAsync("/src/assets/tiles.png")
        .then(image => {
            const backgroundUnitStyleSheet = new UnitStyleSheet(image, 16, 16);
            backgroundUnitStyleSheet.defineTile("ground", 0, 0);
            backgroundUnitStyleSheet.defineTile("sky", 3, 23);
            return backgroundUnitStyleSheet;
        });
}

export function loadMarioSprite() {
    return loadImageAsync("/src/assets/characters.png")
        .then(image => {
            const marioUnitStyleSheet = new UnitStyleSheet(image, 16, 16);
            marioUnitStyleSheet.define("mario", 276, 44, 16, 32);
            return marioUnitStyleSheet;
        });
}
