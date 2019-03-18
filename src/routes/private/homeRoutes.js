import HomePage from '../../views/containers/HomePage';
import PrivateRoute from '../../views/layouts/PrivateRoute';

export default [
  {
    path: '/home',
    component: HomePage,
    breadcrumb: 'Home',
    layout: PrivateRoute,
    menu: {
      icon: 'home',
      name: 'Home',
    },
  },
];
