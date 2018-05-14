// format a hex to 6-chars, ignore leading #
const parseHex = hex =>
  hex.length < 6
    ? hex[hex.length - 3].repeat(2) + hex[hex.length - 2].repeat(2) + hex[hex.length - 1].repeat(2)
    : hex.slice(-(hex.length / 2 | 0) * 2);

export default hex => {
  const s = parseHex(hex);
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16), Math.round(parseInt(s.slice(6, 8) || 'ff', 16) / 0.255) / 1000];
}
