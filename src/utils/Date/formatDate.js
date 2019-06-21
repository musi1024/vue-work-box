const SIGN_REGEXP = /([yMdhsmw])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s) {
  return String(s).padStart(2, '0');
}

function formatDate(dateObj, pattern) {
  pattern = pattern || DEFAULT_PATTERN;

  return pattern.replace(SIGN_REGEXP, e => {
    switch (e[0]) {
      case 'y':
        return padding(dateObj.getFullYear());
      case 'M':
        return padding(dateObj.getMonth() + 1);
      case 'd':
        return padding(dateObj.getDate());
      case 'w':
        return dateObj.getDay();
      case 'h':
        return padding(dateObj.getHours());
      case 'm':
        return padding(dateObj.getMinutes());
      case 's':
        return padding(dateObj.getSeconds());
    }
  });
}

export default formatDate;
