const hasOwn = Object.prototype.hasOwnProperty;

function is(A, B) {
  if (A === B) {
    return A !== 0 || B !== 0 || 1 / A === 1 / B; //+0 !== -0
  }
  return A !== A && B !== B; //NaN
}

export default function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
