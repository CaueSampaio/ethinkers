import OrdersPage from '../../views/containers/OrdersPage';
import PrivateRoute from '../../views/layouts/PrivateRoute';

export default [
  {
    path: '/orders',
    component: OrdersPage,
    breadcrumb: 'Pedidos',
    layout: PrivateRoute,
    menu: {
      icon: 'home',
      name: 'Pedidos',
    },
  },
];
