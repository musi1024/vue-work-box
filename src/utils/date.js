const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
  len = len - (s + '').length;

  for (let i = 0; i < len; i++) {
    s = '0' + s;
  }

  return s;
}

export const formatDate = (dateObj, pattern) => {
  pattern = pattern || DEFAULT_PATTERN;

  return pattern.replace(SIGN_REGEXP, $0 => {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(dateObj.getFullYear(), $0.length);
      case 'M':
        return padding(dateObj.getMonth() + 1, $0.length);
      case 'd':
        return padding(dateObj.getDate(), $0.length);
      case 'w':
        return dateObj.getDay() + 1;
      case 'h':
        return padding(dateObj.getHours(), $0.length);
      case 'm':
        return padding(dateObj.getMinutes(), $0.length);
      case 's':
        return padding(dateObj.getSeconds(), $0.length);
    }
  });
};
