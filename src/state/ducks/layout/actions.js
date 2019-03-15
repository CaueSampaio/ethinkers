import types from './types';

/**
 * Changes layout to mobile.
 *
 * @param {boolean} isMobile Current state of the layout.
 */
function handleMobile(isMobile) {
  return {
    type: types.HANDLE_MOBILE,
    isMobile,
  };
}

/**
 * Changes sider menu state
 *
 * @param {boolean} value Boolean value that changes the collapsed attribute of the sider menu.
 */
function handleSiderCollapsed(value) {
  return {
    type: types.HANDLE_SIDER_COLLAPSED,
    value,
  };
}

/**
 * Alters screen breakpoint based on the window inner width.
 *
 * @param {String} breakpoint Breakpoint
 */
function handleBreakpointChange(breakpoint) {
  return {
    type: types.HANDLE_BREAKPOINT_CHANGE,
    breakpoint,
  };
}

export default {
  handleMobile,
  handleSiderCollapsed,
  handleBreakpointChange,
};
