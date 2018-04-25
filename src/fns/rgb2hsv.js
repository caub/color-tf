export default (r, g, b) => {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const v = max,
    d = max - min,
    s = max === 0 ? 0 : d / max;

  if (d <= 0) return [0, s, v]; // achromatic

  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, v];
};