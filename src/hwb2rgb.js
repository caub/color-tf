export default (h, w, b) => {
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