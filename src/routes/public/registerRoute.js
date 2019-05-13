import RegisterPage from '../../views/containers/RegisterPage';
import PublicLayout from '../../views/layouts/PublicRoute/PublicLayout';

export default [
  {
    path: '/',
    exact: true,
    component: RegisterPage,
    layout: PublicLayout,
    breadcrumb: 'RegisterPage',
  },
];
