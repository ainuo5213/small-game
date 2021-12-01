export const STATE_KEYDOWN = 1;
export const STATE_KEYUP = 0;

export const KEYCODE_SPACE = 32;


export class KeyboardState {
    constructor() {
        // 保存当前键盘状态
        this.keyStates = new Map();

        // 保存键盘事件对应的回调函数
        this.keyMap = new Map();
    }

    addMapping = (keyCode, callback) => {

        // 添加map映射
        this.keyMap.set(keyCode, callback);
    }

    handleEvent = event => {
        const { keyCode } = event;
        if (!this.keyMap.has(keyCode)) {
            return;
        }

        // 阻止键盘的默认行为，比如pageDown等
        event.preventDefault();
        const keyState = event.type === 'keydown' ? STATE_KEYDOWN : STATE_KEYUP;
        
        // 如果当前键盘状态已经存在了，就不再添加新的相同的状态
        if (this.keyStates.get(keyCode) === keyState) {
            return;
        }

        this.keyStates.set(keyCode, keyState);

        const callback = this.keyMap.get(keyCode);
        callback(keyState);
    }

    listenTo = window => {
        // 监听键盘按下和抬起的事件，并交由处理程序
        ['keydown', 'keyup'].forEach(r => {
            window.addEventListener(r, event => {
                event.preventDefault();
                this.handleEvent(event);
            });
        })
    }
}