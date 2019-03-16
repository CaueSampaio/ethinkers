import PrivateRoute from '../../views/layouts/PrivateRoute';

import SalesProductsPage from '../../views/containers/ProductsPage/containers/SalesProductsPage';
import AvailableProductsPage from '../../views/containers/ProductsPage/containers/AvailableProductsPage';
import ShippedBySellersProductsPage from '../../views/containers/ProductsPage/containers/ShippedBySellersProductsPage';

export default [
  {
    path: '/products',
    breadcrumb: 'Produtos',
    layout: PrivateRoute,
    menu: {
      icon: 'file-search',
      name: 'Produtos',
    },
    children: [
      {
        path: 'sales-products',
        url: '/products/sales-products',
        name: 'A Venda',
        component: SalesProductsPage,
        breadcrumb: 'A Venda',
        layout: PrivateRoute,
      },
      {
        path: 'available-products',
        url: '/products/available-products',
        name: 'Disponíveis',
        component: AvailableProductsPage,
        breadcrumb: 'Disponíveis',
        layout: PrivateRoute,
      },
      {
        path: 'shipped-by-sellers',
        url: '/products/shipped-by-sellers',
        name: 'Enviados por Sellers',
        component: ShippedBySellersProductsPage,
        breadcrumb: 'Enviados por Sellers',
        layout: PrivateRoute,
      },
    ],
  },
];
