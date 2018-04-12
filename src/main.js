export const hsl2hsv = (h, s, l) => {
  const t = s * (l < 0.5 ? l : 1 - l),
    V = l + t,
    S = l > 0 ? 2 * t / V : 0;
  return [h, S, V];
};

export const hsl2rgb = (h, s, l) => {
  if (s === 0) return [l, l, l]; // achromatic

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3)];
};

function hue2rgb(p, q, t) {
  // private fn
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export const hsv2hsl = (h, s, v) => {
  const L = (2 - s) * v / 2,
    S = s * v / (L < 0.5 ? L * 2 : 2 - L * 2);

  return [h, S || 0, L];
};

export const hsv2hwb = (h, s, v) => [h, (1 - s) * v, 1 - v];

export const hsv2rgb = (h, s, v) => {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i) {
    case 6:
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
};

export const hwb2hsv = (h, w, b) => [h, b === 1 ? 0 : Math.max(0, 1 - w / (1 - b)), 1 - b];

export const hwb2rgb = (h, w, b) => {
  // could throw or warn, or normalize if w+b>=1 ?
  const v = 1 - b;
  const i = Math.floor(h * 6);
  const f = i & 1 ? 1 + i - h * 6 : h * 6 - i; // if i is odd
  const n = w + f * (v - w); // linear interpolation

  switch (i) {
    case 6:
    case 0:
      return [v, n, w];
    case 1:
      return [n, v, w];
    case 2:
      return [w, v, n];
    case 3:
      return [w, n, v];
    case 4:
      return [n, w, v];
    case 5:
      return [v, w, n];
  }
};

export const rgb2hsl = (r, g, b) => {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2,
    d = max - min;

  if (d <= 0) return [0, 0, l]; // achromatic

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
};

export const rgb2hsv = (r, g, b) => {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const v = max,
    d = max - min,
    s = max === 0 ? 0 : d / max;

  if (d <= 0) return [0, s, v]; // achromatic

  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, v];
};

export const rgb2hwb = (R, G, B) => {
  const max = Math.max(R, G, B),
    min = Math.min(R, G, B);
  const b = 1 - max,
    d = max - min;

  if (d <= 0) return [0, min, b]; // achromatic

  const hue = min === R ? 3 - (G - B) / d : min === G ? 5 - (B - R) / d : 1 - (R - G) / d;

  // const [f, i] = min === R ? [G - B, 3 / 6] : min === G ? [B - R, 5 / 6] : [R - G, 1 / 6];

  return [hue / 6, min, b];
};
