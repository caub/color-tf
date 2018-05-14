import assert from 'assert';
import proxy from '../src/proxy';
import _hwb2hsl from '../dist/src/hwb2hsl'

const {
  rgbToHsl,
  rgbToHsv,
  rgbToHwb,
  hslToRgb,
  hslToHsv,
  hslToHwb,
  hsvToRgb,
  hsvToHsl,
  hsvToHwb,
  hwbToRgb,
  hwbToHsl,
  hwbToHsv,
  rgb2hwb,
  rgb2hsl,
  rgb2hsv,
  hsl2rgb,
  hsv2rgb,
  hsv2hsl,
  hwb2rgb,
  hwb2hsv,
  hwb2hsl,
  rgbToHex,
  hexToRgb,
} = proxy;

const eq = (a, b) => assert.deepEqual(a, b);

eq(rgbToHex(...hexToRgb('#bbb'), true), 'bbbbbb');
eq(rgbToHex(...hexToRgb('aaa')), 'aaa')
eq(rgbToHex(...hexToRgb('e70566')), 'e70566')
eq(rgbToHex(...hexToRgb('#e70566')), 'e70566');
eq(rgbToHex(...hexToRgb('#e7056688')), 'e7056688');

const args1 = [.69, .58, .41];
eq(hwb2hsl(...args1), _hwb2hsl(...args1));
eq(hwb2hsl(...args1), hsv2hsl(...hwb2hsv(...args1)));

// console.log('- hex');
eq(rgbToHex(17, 68, 0), '140');
eq(hexToRgb('140').slice(0, 3), [17, 68, 0]);

eq(rgbToHex(84, 204, 252), '54ccfc');
eq(hexToRgb('54ccfc').slice(0, 3), [84, 204, 252]);

eq(hslToRgb(60, 100, 99), [255, 255, 250]);

const c1 = [144, 0, 100];
assert.deepEqual(rgbToHsv(...hslToRgb(...c1)), [0, 0, 100]);
assert.deepEqual(hslToHsv(...c1), [144, 0, 100]);

assert.deepEqual(rgbToHsl(...hsvToRgb(...c1)), [0, 0, 100]);
assert.deepEqual(hsvToHsl(...c1), [144, 0, 100]);
assert.deepEqual(hsvToRgb(0, 0, 70), [179, 179, 179]);

[
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 255, 0],
  [255, 0, 255],
  [0, 255, 255],
  [250, 29, 134],
  [255, 255, 255],
  [0, 0, 0],
  [128, 128, 128],
  [0, 0, 134],
].forEach(a => {
  const hwb = rgb2hwb(...a.map(x => x / 255));
  const b = hwb2rgb(...hwb).map(x => Math.round(x * 255));
  eq(a, b);
});

const rgb = [0.77, 0.4557, 0.6665];

eq(rgb2hsl(...hsl2rgb(...rgb)).map(x => Math.round(x * 1e8) / 1e8), rgb);

assert.deepEqual(rgbToHwb(153, 153, 153), [0, 60, 40]);

[
  [0 / 360, 0, 0],
  [120 / 360, 0, 0.0],
  [240 / 360, 0.23, 0.05],
  [60 / 360, 0.6, 0.35],
  [60 / 360, 0.6, 0.2],
  [240 / 360, 0.9, 0.0999],
  [240 / 360, 1, 0],
  [240 / 360, 0, 1],
].forEach(x => {
  const y1 = hwb2rgb(...x).map(x => Math.round(x * 255));
  const y2 = hwb2hsv(...x);
  const y3 = hsv2rgb(...y2).map(x => Math.round(x * 255));
  eq(y1, y3);
});

const [h, w, b] = rgbToHwb(0, 0, 255); //  [ 2/3, 0, 0 ]
const white = rgbToHwb(255, 255, 255); // [ 0, 1, 0 ]
const black = rgbToHwb(0, 0, 0); // [ 0, 0, 1 ]

const [wr, br] = [0.5, 0.5];

eq([h, w, b], [240, 0, 0]);
eq(white, [0, 100, 0]);
eq(black, [0, 0, 100]);

assert.equal(rgbToHex(...hwbToRgb(h, w + wr * (100 - w), b + br * (100 - b))), '808080');

const cs = [[62, 134, 191], [42, 90, 127], [83, 179, 255], [21, 45, 64], [75, 161, 229]];

assert.deepEqual(cs.map(ci => rgbToHsl(...ci)), [
  [207, 51, 50],
  [206, 50, 33],
  [207, 100, 66],
  [207, 51, 17],
  [206, 75, 60],
]);

assert.deepEqual(rgb2hsl(...hsv2rgb(120 / 360, 0.1, 1)), [1 / 3, 1, 0.95]);
