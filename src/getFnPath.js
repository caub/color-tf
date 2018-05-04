/**
 * @return fns to compose between 2 keys in lib object e.g. fns.reduceRight((fn, f) => (...a) => f(...fn(...a)))
 */
export default (lib, fromKey, toKey) => {
  let nodes = [fromKey];
  const visited = new Map(); // map node key => parent key
  while (nodes.length) {
    // search breadth-first
    const newNodes = [];

    for (const k of nodes) {
      if (lib[k + '2' + toKey]) {
        // done, we can stop
        const fns = [`${k}2${toKey}`];
        for (let key = k; visited.has(key) && key !== fromKey; key = visited.get(key)) {
          fns.push(`${visited.get(key)}2${key}`);
        }
        return fns;
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