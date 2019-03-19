import { isRegExp } from 'lodash';

export default (value = '', regexp) => {
  let result = '';
  let valueIndex = 0;

  regexp.forEach((item) => {
    if (isRegExp(item)) {
      result += value.charAt(valueIndex);
      valueIndex += 1;
    } else {
      result += item;
    }
  });

  return result;
};
