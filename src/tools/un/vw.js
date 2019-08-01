function allowZero(value, extraCond) {
  return value === 0 ? true : extraCond(value);
}

function vw(px, base = 750, unit = true) {
  if (!allowZero(px, value => value && typeof value === 'number')) {
    throw new Error('px is required and should be a number');
  }
  return (Math.round(px) / base) * 100 + (unit ? 'vw' : '');
}

export default vw;