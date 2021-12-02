import { KeyboardState, CODE_SPACE, STATE_KEYDOWN, CODE_RIGHT, CODE_LEFT } from './KeyboardState.js'

function setupKeyboard(mario) {
    // 监听键盘的空格事件
    const keyboard = new KeyboardState();

    // 添加键盘空格键的映射，并设置一个回调来使马里奥跳跃（设置y方向的速度）
    keyboard.addMapping(CODE_SPACE, keyState => {
        if (keyState === STATE_KEYDOWN) {
            mario.jump.start();
        }
        else {
            mario.jump.cancel();
        }
    });

    // 左键和右键控制马里奥x方向速度的方向
    keyboard.addMapping(CODE_RIGHT, keyState => {
        mario.go.dir = keyState;
    });

    keyboard.addMapping(CODE_LEFT, keyState => {
        mario.go.dir = -keyState;
    });

    return keyboard;
}

export default setupKeyboard;