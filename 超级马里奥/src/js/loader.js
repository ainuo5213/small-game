export function loadImageAsync(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = function () {
            resolve(img);
        }
        img.src = url;
    });
}

export function loadLevelAsync(name) {
    return fetch(`/src/levels/${name}.json`)
        .then(r => r.json());
}