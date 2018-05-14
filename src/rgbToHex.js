export default (R, G, B, A, forceLongVersion) => {
  if (A < 1) {
    const alpha = Math.floor(A * 256);
    return !forceLongVersion && alpha % 17 === 0 && R % 17 === 0 && G % 17 === 0 && B % 17 === 0// short version
      ? R.toString(16)[0] + G.toString(16)[0] + B.toString(16)[0] + alpha.toString(16)[0]
      : R.toString(16).padStart(2, 0) + G.toString(16).padStart(2, 0) + B.toString(16).padStart(2, 0) + alpha.toString(16).padStart(2, 0);
  }
  return !forceLongVersion && R % 17 === 0 && G % 17 === 0 && B % 17 === 0// short version
    ? R.toString(16)[0] + G.toString(16)[0] + B.toString(16)[0]
    : R.toString(16).padStart(2, 0) + G.toString(16).padStart(2, 0) + B.toString(16).padStart(2, 0);
}

