/*eslint-disable*/
import React from 'react';

export const CheckBox = (props) => {
  return (
    <li>
      <input
        key={props.channelSku.id}
        onClick={props.handleCheckChieldElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.channelSku.refSku}
      />{' '}
      {props.value}
    </li>
  );
};

export default CheckBox;
