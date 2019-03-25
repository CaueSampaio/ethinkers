import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import './style.less';

const PrivatePageHeaderButton = ({ children, onClick, icon }) => (
  <button
    type="submit"
    className="private-page-header-button"
    onClick={onClick}
  >
    {icon && <Icon className="private-page-header-action-icon" type={icon} />}
    {children}
  </button>
);

PrivatePageHeaderButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export default PrivatePageHeaderButton;
