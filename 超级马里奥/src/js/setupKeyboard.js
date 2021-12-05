import { KeyboardState, CODE_UP, STATE_KEYDOWN, CODE_RIGHT, CODE_LEFT, CODE_SPACE } from './KeyboardState.js'

function setupKeyboard(mario) {
    // 监听键盘的空格事件
    const keyboard = new KeyboardState();

    // 上键作为马里奥的跳跃键
    keyboard.addMapping(CODE_UP, keyState => {
        if (keyState === STATE_KEYDOWN) {
            mario.jump.start();
        }
        else {
            mario.jump.cancel();
        }
    });

    keyboard.addMapping(CODE_SPACE, keyState => {
        mario.turbo(keyState);
    });

    // 左键和右键控制马里奥x方向速度的方向
    keyboard.addMapping(CODE_RIGHT, keyState => {
        mario.go.dir += keyState ? 1 : -1;
    });

    keyboard.addMapping(CODE_LEFT, keyState => {
        mario.go.dir += keyState ? -1 : 1;
    });

    return keyboard;
}

export default setupKeyboard;