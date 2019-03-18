import { isEmpty } from 'lodash';

import privateRoutes from './private';
import publicRoutes from './public';

const routes = [...privateRoutes, ...publicRoutes];

export const getBreadcrumbMap = () => {
  const result = {};

  routes.forEach((route) => {
    if (!isEmpty(route.breadcrumb)) result[route.path] = route.breadcrumb;
  });
  return result;
};

export const getBreadCrumb = (path) => {
  let currentPath = path;
  while (currentPath.length) {
    const { breadcrumb = '' } = routes.find(
      (item) => item.path === currentPath /* eslint-disable-line */,
    );
    if (breadcrumb) return breadcrumb;

    currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  }
  return path;
};

export default routes;
