export default (h, s, l) => {
  const t = s * (l < 0.5 ? l : 1 - l),
    V = l + t,
    S = l > 0 ? 2 * t / V : 0;
  return [h, S, V];
};