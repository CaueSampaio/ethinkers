import OrdersPage from '../../views/containers/OrdersPage';
import PrivateLayout from '../../views/layouts/PrivateLayout';
import SalesProductsPage from '../../views/containers/ProductsPage/containers/SalesProductsPage';

export default [
  {
    path: '/orders',
    component: OrdersPage,
    breadcrumb: 'Pedidos',
    layout: PrivateLayout,
    menu: {
      icon: 'home',
      name: 'Pedidos',
    },
    children: [
      {
        path: 'sales-products',
        component: SalesProductsPage,
        breadcrumb: 'Pedidos teste',
        layout: PrivateLayout,
        name: 'Pedidos teste',
      },
    ],
  },
];
