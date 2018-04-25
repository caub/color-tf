## Color transforms between RGB, HSL, HSV and HWB, and more

sources:

* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
* http://alvyray.com/Papers/CG/hwb2rgb.htm
* https://unpkg.com/color-convert@1.9.1/conversions.js (todo add other functions from there)

naming convention:

* foo2bar: input and output are in [0, 1]
* fooToBar: natural ranges: hues in [0, 360[, colors in [0, 255], saturation/value/lightness in [0, 100]

The default export is a proxy, there are alse [direct functions](https://unpkg.com/color-tf@5.0.0-beta2/src/) available

### Usage

```js
import colorTf from 'color-tf';
import hsl2hsv from 'color-tf/hsl2hsv';

colorTf.hslToRgb(200, 95, 62); // [ 66, 189, 250 ]
console.assert(hsl2hsv === colorTf.hsl2hsv);
```
