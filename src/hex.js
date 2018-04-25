// Hex <-> RGB
// ab128c -> [r, g, b]
export const hexToRgb = s => s.length === 3
  ? [parseInt(s[0] + s[0], 16), parseInt(s[1] + s[1], 16), parseInt(s[2] + s[2], 16)]
  : s.length === 6
    ? [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
    : [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16), Math.round(parseInt(s.slice(6, 8), 16) / 0.255) / 1000];

export const rgbToHex = (R, G, B, A) =>
  R % 17 === 0 && G % 17 === 0 && B % 17 === 0 && A === undefined // short version
    ? R.toString(16)[0] + G.toString(16)[0] + B.toString(16)[0]
    : R.toString(16).padStart(2, 0) + G.toString(16).padStart(2, 0) + B.toString(16).padStart(2, 0) + (A ? Math.round(A * 255).toString(16).padStart(2, 0) : '');
