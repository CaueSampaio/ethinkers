import { isEmpty } from 'lodash';

export function removeMaskField(value) {
  return isEmpty(value) ? value : value.replace(/\D+/g, '');
}

export function removeFieldMaskFromEvent({ target: { value } }) {
  return removeMaskField(value);
}
