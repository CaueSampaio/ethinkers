import { isEmpty } from 'lodash';

import { removeMaskField } from './removeMaskField';

export default (rule, value, callback) => {
  const realValue = removeMaskField(value);

  if (isEmpty(realValue)) {
    callback();
    return;
  }

  const { min, max, message } = rule;

  if (realValue.length < min || realValue.length > max) callback(message);

  callback();
};
