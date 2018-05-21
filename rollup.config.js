import babel from 'rollup-plugin-babel';
import * as lib from './src/fns';

export default [{
  input: ['src/proxy.js', 'src/hexToRgb.js', 'src/rgbToHex.js', ...Object.keys(lib).map(name => `src/${name}.js`)],
  output: [{
    format: 'cjs',
    dir: 'dist',
  }, {
    format: 'es',
    dir: 'dist/src',
  }],
  plugins: [
    babel()
  ],
  experimentalCodeSplitting: true,
}, {
  input: 'src/proxy.js',
  output: {
    format: 'umd',
    file: 'dist/umd.js',
    name: 'colorTf',
  },
  plugins: [
    babel(),
  ],
}];
