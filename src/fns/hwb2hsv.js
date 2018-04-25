export default (h, w, b) => [h, b === 1 ? 0 : Math.max(0, 1 - w / (1 - b)), 1 - b];
