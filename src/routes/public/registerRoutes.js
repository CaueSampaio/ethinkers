import RegisterPage from '../../views/containers/RegisterPage';
import PublicLayout from '../../views/layouts/PublicRoute/PublicLayout';

export default [
  {
    path: '/register',
    component: RegisterPage,
    breadcrumb: 'Nova conta',
    layout: PublicLayout,
  },
];
