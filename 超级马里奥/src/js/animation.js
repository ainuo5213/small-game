export function createAnim(frames, frameLenth) {
    return function resolveFrame(distance) {
        const index = Math.floor(distance / frameLenth) % frames.length;
        return frames[index];
    }
}
