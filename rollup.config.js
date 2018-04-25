import fs from 'fs';
import babel from 'rollup-plugin-babel';

const fns = fs.readdirSync('src/fns');

console.log(fns)

export default [{
  input: ['src/proxy.js', ...fns.map(name => 'src/fns/' + name)],
  output: [
    {
      format: 'es',
      dir: 'dist/es',
    },
    {
      format: 'cjs',
      dir: 'dist/cjs',
    },
  ],
  plugins: [
    // babel({
    //   exclude: 'node_modules/**',
    // }),
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
    // babel({
    //   exclude: 'node_modules/**',
    // }),
  ],
}];
