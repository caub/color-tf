import * as lib from './fns';

import * as libHex from './hex';

import getFnPath from './getFnPath';

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
      if (typeof key !== 'string') return map;

      if (map.has(key)) return map.get(key);

      const fromKey = key.slice(0, 3);
      const toKey = key.slice(-3).toLowerCase();

      const k = fromKey + '2' + toKey;
      let fn = lib[k];
      if (!fn) {
        // todo check fromKey, toKey are in available keys, else getPath might be in infinite loop
        const fns = getFnPath(lib, fromKey, toKey).map(n => lib[n]);
        fn = fns.reduceRight((f, g) => (...a) => g(...f(...a)));
        map.set(k, fn);
      }
      if (key[3] === '2') return fn;

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
