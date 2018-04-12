import * as lib from './main';

const roundH = ([h, s, l]) => [Math.round(360 * h) % 360, Math.round(100 * s), Math.round(100 * l)];

export const rgbToHsl = (r, g, b) => roundH(lib.rgb2hsl(r / 255, g / 255, b / 255));

export const rgbToHsv = (r, g, b) => roundH(lib.rgb2hsv(r / 255, g / 255, b / 255));

export const rgbToHwb = (r, g, b) => roundH(lib.rgb2hwb(r / 255, g / 255, b / 255));

export const hslToRgb = (h, x, y) => lib.hsl2rgb(h / 360, x / 100, y / 100).map(v => Math.round(v * 255));

export const hslToHsv = (h, x, y) => roundH(lib.hsl2hsv(h / 360, x / 100, y / 100));

export const hsl2hwb = (a, b, c) => lib.hsv2hwb(...lib.hsl2hsv(a, b, c));

export const hslToHwb = (h, x, y) => roundH(hsl2hwb(h / 360, x / 100, y / 100));

export const hsvToRgb = (h, x, y) => lib.hsv2rgb(h / 360, x / 100, y / 100).map(v => Math.round(v * 255));

export const hsvToHsl = (h, x, y) => roundH(lib.hsv2hsl(h / 360, x / 100, y / 100));

export const hsvToHwb = (h, x, y) => roundH(lib.hsv2hwb(h / 360, x / 100, y / 100));

export const hwbToRgb = (h, x, y) => lib.hwb2rgb(h / 360, x / 100, y / 100).map(v => Math.round(v * 255));

export const hwb2hsl = (a, b, c) => lib.hsv2hsl(...lib.hwb2hsv(a, b, c));

export const hwbToHsl = (h, x, y) => roundH(hwb2hsl(h / 360, x / 100, y / 100));

export const hwbToHsv = (h, x, y) => roundH(lib.hwb2hsv(h / 360, x / 100, y / 100));

