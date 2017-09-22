## Deprecated

use color-convert


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

