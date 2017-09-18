### Exported functions <small>(4\*5\*2)</small>

```
- rgbToHsl, rgb2hsl
- rgbToHsv, rgb2hsv
- rgbToHwb, rgb2hwb
- rgbToHex, rgb2hex

- hslToRgb, hsl2rgb
- hslToHsv, hsl2hsv
- hslToHwb, hsl2hwb
- hslToHex, hsl2hex

- hsvToRgb, hsv2rgb
- hsvToHsl, hsv2hsl
- hsvToHwb, hsv2hwb
- hsvToHex, hsv2hex

- hwbToRgb, hwb2rgb
- hwbToHsl, hwb2hsl
- hwbToHsv, hwb2hsv
- hwbToHex, hwb2hex

- hexToRgb, hex2rgb
- hexToHsl, hex2hsl
- hexToHsv, hex2hsv
- hexToHwb, hex2hwb
```

### Usage

```js
const {hslToRgb} = require('colorutil');

hslToRgb(200/360, .95, .62); // [ 0.259, 0.740333, 0.981 ]

```
