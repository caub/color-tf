### Usage

```js
const {hslToRgb, hsvToHex} = require('colorutil');

hslToRgb(200, 95, 62); // [ 66, 189, 250 ]
hsvToHex(200, 95, 62); // '086c9e'

```

### Exported functions

| to  | rgb | hex | hsl | hsv | hwb |
|:---:|:---:|:---:|:---:|:---:|:---:|
| rgb |     |  ✓  |  ✓  |  ✓  |  ✓  |
| hex |  ✓  |     |  ✓  |  ✓  |  ✓  |
| hsl |  ✓  |  ✓  |     |  ✓  |  ✓  |
| hsv |  ✓  |  ✓  |  ✓  |     |  ✓  |
| hwb |  ✓  |  ✓  |  ✓  |  ✓  |     |


| natural input/output | normalized [0,1] io |
| :---:  | :---: |
| rgbToHsl | rgb2hsl |
| rgbToHsv | rgb2hsv |
| rgbToHwb | rgb2hwb |
| rgbToHex | rgb2hex |
| hslToRgb | hsl2rgb |
| hslToHsv | hsl2hsv |
| hslToHwb | hsl2hwb |
| hslToHex | hsl2hex |
| hsvToRgb | hsv2rgb |
| hsvToHsl | hsv2hsl |
| hsvToHwb | hsv2hwb |
| hsvToHex | hsv2hex |
| hwbToRgb | hwb2rgb |
| hwbToHsl | hwb2hsl |
| hwbToHsv | hwb2hsv |
| hwbToHex | hwb2hex |
| hexToRgb | hex2rgb |
| hexToHsl | hex2hsl |
| hexToHsv | hex2hsv |
| hexToHwb | hex2hwb |

### todos:

- Lab, LCH, .. https://drafts.csswg.org/css-color/#color-conversion-code