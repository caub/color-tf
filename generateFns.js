import fs from 'fs';
import * as lib from './src/fns';
import getFnPath from './src/getFnPath';

const libKeys = [...new Set(Object.keys(lib).map(k => k.slice(0, 3)))];

for (const fromKey of libKeys) {
  for (const toKey of libKeys) {
    if (fromKey === toKey) continue;
    const k = fromKey + '2' + toKey;
    if (!lib[k]) {
      console.log('generating', k);
      const fnsKeys = getFnPath(lib, fromKey, toKey);

      // const fn = fnsPath.reduceRight((fn, f) => (...a) => f(...fn(...a)));

      const s = `${fnsKeys.map(k => `import ${k} from './${k}';`).join('\n')}

export default (...a) => ${fnsKeys.join('(...')}(...a)${')'.repeat(fnsKeys.length - 1)};`;

      fs.writeFileSync(`./dist/src/${k}.js`, s);
    }
  }
}
