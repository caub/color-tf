export default _hex => {
  const hex = _hex[0] === '#' ? _hex.slice(1) : _hex;
  const s = hex.length < 6
    ? (hex[hex.length - 4] || '').repeat(2) + hex[hex.length - 3].repeat(2) + hex[hex.length - 2].repeat(2) + hex[hex.length - 1].repeat(2)
    : hex;
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
    ...s.length === 6 ? [] : [Math.round(parseInt(s.slice(6, 8), 16) / 0.255) / 1000]
  ];
}
