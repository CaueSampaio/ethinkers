import LoginPage from '../../views/containers/LoginPage';
import PublicLayout from '../../views/layouts/PublicRoute/PublicLayout';

export default [
  {
    path: '/login',
    component: LoginPage,
    breadcrumb: 'Login',
    layout: PublicLayout,
  },
];
