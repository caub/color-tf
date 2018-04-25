export default (h, s, v) => {
  const L = (2 - s) * v / 2,
    S = s * v / (L < 0.5 ? L * 2 : 2 - L * 2);

  return [h, S || 0, L];
};