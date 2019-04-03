import LoginPage from '../../views/containers/LoginPage';
import PublicLayout from '../../views/layouts/PublicRoute/PublicLayout';

export default [
  {
    path: '/login',
    exact: true,
    component: LoginPage,
    layout: PublicLayout,
    breadcrumb: 'Login',
  },
];
