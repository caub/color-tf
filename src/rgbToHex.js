export default (R, G, B, A = 1, forceLongVersion) =>
  !forceLongVersion && A === 1 && R % 17 === 0 && G % 17 === 0 && B % 17 === 0// short version
    ? R.toString(16)[0] + G.toString(16)[0] + B.toString(16)[0]
    : R.toString(16).padStart(2, 0) + G.toString(16).padStart(2, 0) + B.toString(16).padStart(2, 0) + (A !== 1 ? Math.floor(A * 256).toString(16).padStart(2, 0) : '');
