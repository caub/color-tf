## Color transforms between RGB, HSL, HSV and HWB, and more

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][codecov-image]][codecov-url]

sources:

* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
* http://alvyray.com/Papers/CG/hwb2rgb.htm

naming convention:

* foo2bar: input and output are in [0, 1]
* fooToBar: natural ranges: hues in [0, 360[, r/g/b in [0, 255], saturation/value/lightness in [0, 100]

The default export is a proxy, there are also [direct functions](https://unpkg.com/color-tf/) available

### Usage

```js
import colorTf from 'color-tf';
import hsl2hsv from 'color-tf/hsl2hsv';

colorTf.hslToRgb(200, 95, 62); // [ 66, 189, 250 ]
console.assert(hsl2hsv === colorTf.hsl2hsv);
```

[npm-image]: https://img.shields.io/npm/v/color-tf.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/color-tf
[travis-image]: https://img.shields.io/travis/caub/color-tf.svg?style=flat-square
[travis-url]: https://travis-ci.org/caub/color-tf
[codecov-image]: https://img.shields.io/codecov/c/github/caub/color-tf.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/caub/color-tf
