import ListUserPage from '../../views/containers/ListUserPage';
import PublicLayout from '../../views/layouts/PublicRoute/PublicLayout';

export default [
  {
    path: '/list-user',
    exact: true,
    component: ListUserPage,
    layout: PublicLayout,
    breadcrumb: 'ListUserPage',
  },
];
