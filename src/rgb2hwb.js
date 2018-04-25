export default (R, G, B) => {
  const max = Math.max(R, G, B),
    min = Math.min(R, G, B);
  const b = 1 - max,
    d = max - min;

  if (d <= 0) return [0, min, b]; // achromatic

  const hue = min === R ? 3 - (G - B) / d : min === G ? 5 - (B - R) / d : 1 - (R - G) / d;

  // const [f, i] = min === R ? [G - B, 3 / 6] : min === G ? [B - R, 5 / 6] : [R - G, 1 / 6];

  return [hue / 6, min, b];
};