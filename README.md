## Color transforms between RGB, HSL, HSV and HWB, and more

sources:

* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
* http://alvyray.com/Papers/CG/hwb2rgb.htm
* https://unpkg.com/color-convert@1.9.1/conversions.js (todo add other functions from there)

naming convention:

* foo2bar: input and output are in [0, 1]
* fooToBar: natural ranges: hues in [0, 360[, colors in [0, 255], saturation/value/lightness in [0, 100]

### Usage

```js
import { hslToRgb, hsvToHex } from 'color-tf';

hslToRgb(200, 95, 62); // [ 66, 189, 250 ]
hsvToHex(200, 95, 62); // '086c9e'
```
