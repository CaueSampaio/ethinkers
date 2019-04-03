/*eslint-disable*/
import React from 'react';

export const CheckBox = (props) => {
  return (
    <li>
      <input
        key={props.Id}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.Id}
      />{' '}
      {props.value}
    </li>
  );
};

export default CheckBox;
