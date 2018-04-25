import babel from 'rollup-plugin-babel';

export default {
  input: 'src/proxy.js',
  output: {
    format: 'umd',
    file: 'dist/umd.js',
    name: 'colorTf',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
