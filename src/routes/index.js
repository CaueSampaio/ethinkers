import { isEmpty } from 'lodash';

import privateRoutes from './private';

const routes = [...privateRoutes];

export const getBreadcrumbMap = () => {
  const result = {};

  routes.forEach((route) => {
    if (!isEmpty(route.breadcrumb)) result[route.path] = route.breadcrumb;
  });

  return result;
};

export const getBreadcrumb = (path) => {
  let currentPath = path;
  while (currentPath.length) {
    const { breadcrumb = '' } = routes.find((item) => item.path === currentPath); // eslint-disable-line
    if (breadcrumb) return breadcrumb;

    currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  }
  return path;
};

export default routes;
