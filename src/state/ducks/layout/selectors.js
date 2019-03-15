import { createSelector } from 'reselect';

const selectLayout = ({ layout }) => layout;

const makeSelectIsMobile = () =>
  createSelector(
    selectLayout,
    ({ isMobile }) => isMobile,
  );

const makeSelectIsCollapsed = () =>
  createSelector(
    selectLayout,
    ({ isCollapsed }) => isCollapsed,
  );

const makeSelectBreakpoint = () =>
  createSelector(
    selectLayout,
    ({ breakpoint }) => breakpoint,
  );

export default {
  selectLayout,
  makeSelectIsMobile,
  makeSelectIsCollapsed,
  makeSelectBreakpoint,
};
