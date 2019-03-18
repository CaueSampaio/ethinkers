import PrivateRoute from '../../views/layouts/PrivateRoute';

import OrdersPage from '../../views/containers/OrdersPage';
import OrderDetailsPage from '../../views/containers/OrdersPage/containers/OrderDetailsPage';

export default [
  {
    path: '/orders',
    exact: true,
    component: OrdersPage,
    breadcrumb: 'Pedidos',
    layout: PrivateRoute,
    menu: {
      icon: 'file-search',
      name: 'Pedidos',
    },
  },
  {
    path: '/orders/:id',
    exact: true,
    component: OrderDetailsPage,
    breadcrumb: 'Detalhes do Pedido',
    layout: PrivateRoute,
  },
];
