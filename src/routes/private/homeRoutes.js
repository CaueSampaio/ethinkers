import HomePage from '../../views/containers/HomePage';
import PrivateLayout from '../../views/layouts/PrivateLayout';

export default [
  {
    path: '/home',
    component: HomePage,
    breadcrumb: 'Home',
    layout: PrivateLayout,
    menu: {
      icon: 'home',
      name: 'Home',
    },
  },
];
