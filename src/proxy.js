import * as lib from './fns/index';

import * as libHex from './hex';

const libKeys = Object.keys(lib);

/**
 * @return the shortest (inverted) path fn between 2 keys in lib object
 */
const getPath = (fromKey, toKey) => {
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
      libKeys
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

const roundH = ([h, s, l]) => [Math.round(360 * h) % 360, Math.round(100 * s), Math.round(100 * l)];

/**
 * all functions available from a Proxy (to generate missing ones dynamically)
 * foo2bar for functions with input/output in [0, 1]
 * fooToBar for functions with natural inputs [0,255] for r,g,b, [0,360[ for hue, [0, 100] for the rest
 */
export default new Proxy(
  new Map([...Object.entries(lib), ...Object.entries(libHex)]),
  {
    get: (map, key) => {
      console.log('get', key);
      if (map.has(key)) return map.get(key);

      const fromKey = key.slice(0, 3);
      const toKey = key.slice(-3).toLowerCase();

      const k = fromKey + '2' + toKey;
      let fn = lib[k];
      if (!fn) {
        // todo check fromKey, toKey are in available keys, else getPath might be in infinite loop

        const path = getPath(fromKey, toKey);
        const funcs = Array.from({ length: path.length - 1 }, (_, i) => lib[`${path[i + 1]}2${path[i]}`]);
        fn = funcs.reduceRight((func, f) => (...a) => f(...func(...a)));
        console.log('get path', fromKey, toKey, path, fn);
        map.set(k, fn);
      }
      if (k[3] === '2') return fn;

      const K = fromKey + 'To' + toKey[0].toUpperCase() + toKey.slice(1);
      const FN = fromKey === 'rgb'
        ? (r, g, b) => roundH(fn(r / 255, g / 255, b / 255))
        : toKey === 'rgb'
          ? (h, x, y) => fn(h / 360, x / 100, y / 100).map(v => Math.round(v * 255))
          : (h, x, y) => roundH(fn(h / 360, x / 100, y / 100));
      map.set(K, FN);
      return FN;
    }
  }
);
