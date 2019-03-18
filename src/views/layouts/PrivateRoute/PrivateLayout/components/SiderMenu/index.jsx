import React from 'react';
import PropTypes from 'prop-types';
import DrawerMenu from 'rc-drawer';
import 'rc-drawer/assets/index.css';

import ApplicationMenu from './ApplicationMenu';

const Wrapper = (props) => {
  const { isMobile, isCollapsed, onCollapse } = props;

  return isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      open={!isCollapsed}
      onHandleClick={() => {
        onCollapse(!isCollapsed);
      }}
      onMaskClick={() => {
        onCollapse(!isCollapsed);
      }}
    >
      <ApplicationMenu
        {...props}
        isCollapsed={isMobile ? false : isCollapsed}
      />
    </DrawerMenu>
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
