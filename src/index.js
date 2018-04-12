export * from './main';
export * from './main.gen';

// Hex <-> RGB
// ab128c -> [r, g, b]
export const hexToRgb = s =>
  s.length === 3
    ? [parseInt(s[0] + s[0], 16), parseInt(s[1] + s[1], 16), parseInt(s[2] + s[2], 16)]
    : [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];

export const hex2rgb = s => hexToRgb(s).map(x => x / 255);

export const rgbToHex = (R, G, B) =>
  R % 17 === 0 && G % 17 === 0 && B % 17 === 0 // short version
    ? R.toString(16)[0] + G.toString(16)[0] + B.toString(16)[0]
    : R.toString(16).padStart(2, 0) + G.toString(16).padStart(2, 0) + B.toString(16).padStart(2, 0);

export const rgb2hex = (r, g, b) => rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
