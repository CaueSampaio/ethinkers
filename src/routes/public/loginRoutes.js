import LoginPage from '../../views/containers/LoginPage';
import PublicLayout from '../../views/layouts/PublicLayout';

export default [
  {
    path: '/login',
    component: LoginPage,
    breadcrumb: 'Login',
    layout: PublicLayout,
  },
];
