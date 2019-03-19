import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import 'rc-drawer/assets/index.css';

import ApplicationMenu from './ApplicationMenu';

const Wrapper = (props) => {
  const { isMobile, isCollapsed, onCollapse } = props;

  return isMobile ? (
    <Drawer
      visible={!isCollapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      className="drawer-menu"
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <ApplicationMenu
        {...props}
        isCollapsed={isMobile ? false : isCollapsed}
      />
    </Drawer>
  ) : (
    <ApplicationMenu {...props} />
  );
};

Wrapper.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

export default Wrapper;
