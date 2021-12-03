import UnitStyleSheet from "./UnitStyleSheet.js";
import { loadImageAsync } from "./loader.js";

export function loadMarioSprite() {
    return loadImageAsync("/src/assets/characters.png")
        .then(image => {
            const marioUnitStyleSheet = new UnitStyleSheet(image, 16, 16);
            marioUnitStyleSheet.define("mario", 276, 44, 16, 32);
            return marioUnitStyleSheet;
        });
}
