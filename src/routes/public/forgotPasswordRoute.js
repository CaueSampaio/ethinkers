import ForgotPasswordPage from '../../views/containers/ForgotPasswordPage';
import PublicLayout from '../../views/layouts/PublicRoute/PublicLayout';

export default [
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
    breadcrumb: 'Esqueci minha senha',
    layout: PublicLayout,
  },
];
