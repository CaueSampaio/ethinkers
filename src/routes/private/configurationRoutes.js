import PrivateRoute from '../../views/layouts/PrivateRoute';
import ConfigurationPage from '../../views/containers/ConfigurationPage';
import AccountPage from '../../views/containers/ConfigurationPage/containers/AccountPage';

export default [
  {
    path: '/configurations',
    exact: true,
    component: ConfigurationPage,
    breadcrumb: 'Configurações',
    layout: PrivateRoute,
    menu: {
      icon: 'setting',
      name: 'Configuração',
    },
  },
  {
    path: '/configurations/account',
    exact: true,
    component: AccountPage,
    breadcrumb: 'Configuração',
    layout: PrivateRoute,
  },
];
