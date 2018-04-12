import * as lib from './main';

export * from './main';

// Hex <-> RGB
// ab128c -> [r, g, b]
export const hexToRgb = s =>
  s.length === 3
    ? [parseInt(s[0] + s[0], 16), parseInt(s[1] + s[1], 16), parseInt(s[2] + s[2], 16)]
    : [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];

export const hex2rgb = s => hexToRgb(s).map(x => x / 255);

export const rgbToHex = (R, G, B) =>
  R % 17 === 0 && G % 17 === 0 && B % 17 === 0 // short version
    ? R.toString(16)[0] + G.toString(16)[0] + B.toString(16)[0]
    : R.toString(16).padStart(2, 0) + G.toString(16).padStart(2, 0) + B.toString(16).padStart(2, 0);

export const rgb2hex = (r, g, b) => rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));

/**
 * @return the shortest path fn between 2 keys in lib object
 * ex: getFn('hsl', 'hwb')
 */
export const getFn = (fromKey, toKey) => {
  let nodes = [fromKey];
  const visited = new Map(); // map node key => parent key
  while (nodes.length) {
    // search breadth-first
    const newNodes = [];

    for (const k of nodes) {
      if (lib[k + '2' + toKey]) {
        // done, we can stop
        const arr = [toKey, k];
        let fn = lib[k + '2' + toKey];
        for (let key = k; visited.has(key) && key !== fromKey; key = visited.get(key)) {
          // compose functions while there's a parent
          fn = compose(fn, lib[visited.get(key) + '2' + key]);
          arr.push(visited.get(key));
        }
        fn.path = arr.reverse();
        return fn;
      }
      Object.keys(lib)
        .filter(s => s.slice(0, 3) === k)
        .map(s => s.slice(4))
        .filter(key => !visited.has(key))
        .forEach(key => {
          visited.set(key, k);
          newNodes.push(key);
        });
    }
    nodes = newNodes;
  }
};

const compose = (f, g) => (...args) => f(g(...args));

const roundH = ([h, s, l]) => [Math.round(360 * h) % 360, Math.round(100 * s), Math.round(100 * l)];

export const buildAll = () => {
  const all = Object.assign({ rgbToHex, rgb2hex, hexToRgb, hex2rgb }, lib);
  ['rgb', 'hsl', 'hsv', 'hwb'].forEach((fromKey, _, arr) => {
    arr.forEach(toKey => {
      if (fromKey === toKey) return;

      const key = fromKey + '2' + toKey;
      if (!all[key]) {
        all[key] = getFn(fromKey, toKey);
      }

      const Key = fromKey + 'To' + toKey[0].toUpperCase() + toKey.slice(1);
      if (!all[Key]) {
        all[Key] =
          fromKey === 'rgb'
            ? (r, g, b) => roundH(all[key](r / 255, g / 255, b / 255))
            : fromKey === 'hex'
              ? hex => roundH(all[key](hex))
              : toKey === 'rgb'
                ? (h, x, y) => all[key](h / 360, x / 100, y / 100).map(v => Math.round(v * 255))
                : toKey === 'hex'
                  ? (h, x, y) => all[key](h / 360, x / 100, y / 100)
                  : (h, x, y) => roundH(all[key](h / 360, x / 100, y / 100));
      }
    });
  });
  return all;
};
