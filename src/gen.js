import fs from 'fs';
import * as lib from './main';

// generate remaining functions

/**
 * @return the shortest (inverted) path fn between 2 keys in lib object
 */
const getToFromPath = (fromKey, toKey) => {
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
          arr.push(visited.get(key));
        }
        return arr;
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

const genWrapped = (fromKey, toKey, prefix = '') => {
  const fn = prefix + fromKey + '2' + toKey;
  const key = fromKey + 'To' + toKey[0].toUpperCase() + toKey.slice(1);
  return (
    `export const ${key} = ` +
    (fromKey === 'rgb'
      ? `(r, g, b) => roundH(${fn}(r / 255, g / 255, b / 255))`
      : toKey === 'rgb'
        ? `(h, x, y) => ${fn}(h / 360, x / 100, y / 100).map(v => Math.round(v * 255))`
        : `(h, x, y) => roundH(${fn}(h / 360, x / 100, y / 100))`) +
    ';'
  );
};

let str = `import * as lib from './main';

const roundH = ([h, s, l]) => [Math.round(360 * h) % 360, Math.round(100 * s), Math.round(100 * l)];\n\n`;

['rgb', 'hsl', 'hsv', 'hwb'].forEach((fromKey, _, arr) => {
  arr.forEach(toKey => {
    if (fromKey === toKey) return;

    const key = fromKey + '2' + toKey;
    if (!lib[key]) {
      const path = getToFromPath(fromKey, toKey);
      const fns = Array.from({ length: path.length - 1 }, (_, i) => `lib.${path[i + 1]}2${path[i]}`);
      str += `export const ${fromKey}2${toKey} = (a, b, c) => ${fns.join('(...')}(a, b, c${')'.repeat(
        fns.length,
      )};\n\n`;
      str += genWrapped(fromKey, toKey) + '\n\n';
    } else {
      str += genWrapped(fromKey, toKey, 'lib.') + '\n\n';
    }
  });
});

fs.writeFileSync(__dirname + '/main.gen.js', str);
