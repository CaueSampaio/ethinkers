/*eslint-disable*/
import React from 'react';

export const CheckBox = (props) => {
  return (
    <li>
      <input
        key={props.id}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.id}
      />{' '}
      {props.value}
    </li>
  );
};

export default CheckBox;
