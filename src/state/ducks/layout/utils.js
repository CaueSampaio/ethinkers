import { isEmpty } from 'lodash';

import routes from '../../../routes';
// import { getAllDiscriminators } from '../../../utils/constants';
import constants from './constants';

const menuData = routes
  .map((route) => {
    if (!isEmpty(route.menu)) {
      const {
        path,
        menu: { icon, name },
        children,
      } = route;

      return {
        name,
        icon,
        path: path.substring(1),
        children: route.children ? [...children] : [],
      };
    }
    return null;
  })
  .filter((data) => data !== null);

function menuFormatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    const path = parentPath + item.path;

    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };

    if (item.children) {
      result.children = menuFormatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority,
      );
    }

    return result;
  });
}

const getMenuData = () => menuFormatter(menuData);
const urlToList = (url) => {
  const urllist = url.split('/').filter((i) => i);
  return urllist.map(
    (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`,
  );
};

const findBreakpoint = (size) => {
  const { breakpoints } = constants;

  let found = '';

  Object.keys(breakpoints).forEach((bp) => {
    if (size >= breakpoints[bp].min && size <= breakpoints[bp].max) found = bp;
  });

  return found;
};

const getBreakpointNumber = (breakpoint) =>
  Object.keys(constants.breakpoints).indexOf(breakpoint);

export default {
  getMenuData,
  urlToList,
  findBreakpoint,
  getBreakpointNumber,
};
