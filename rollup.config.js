import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'es',
      file: 'colorutil.es.js',
    },
    {
      format: 'umd',
      file: 'colorutil.umd.js',
      name: 'colorutil',
    },
    {
      format: 'cjs',
      file: 'colorutil.cjs.js',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
