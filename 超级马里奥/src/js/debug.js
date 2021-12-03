export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;
    ["mousedown", "mousemove"].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            // 如果按了鼠标左键，就将马里奥拖拽（设置速度为0，位置为点击时和鼠标移动时的位置）
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y);
            } else if (
                event.buttons === 2 &&
                lastEvent &&
                lastEvent.buttons === 2 &&
                lastEvent.type === "mousemove") {
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }
            lastEvent = event;
        });
    });
    canvas.addEventListener("contextmenu", e => {
        e.preventDefault();
    })
}