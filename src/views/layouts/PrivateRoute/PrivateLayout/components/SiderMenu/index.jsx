import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';

import ApplicationMenu from './ApplicationMenu';

const getFlatMenuKeys = (menuData) => {
  let keys = [];
  menuData.forEach((item) => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

const Wrapper = (props) => {
  const { isMobile, menuData, isCollapsed, onCollapse } = props;

  return isMobile ? (
    <Drawer
      visible={!isCollapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <ApplicationMenu
        {...props}
        flatMenuKeys={getFlatMenuKeys(menuData)}
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
  menuData: PropTypes.array,
};

export default Wrapper;
