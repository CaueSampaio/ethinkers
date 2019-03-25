import PrivateRoute from '../../views/layouts/PrivateRoute';

import SalesProductsPage from '../../views/containers/ProductsPage/containers/SalesProductsPage';
import AvailableProductsPage from '../../views/containers/ProductsPage/containers/AvailableProductsPage';
import ShippedBySellersProductsPage from '../../views/containers/ProductsPage/containers/ShippedBySellersProductsPage';
import EditProductPage from '../../views/containers/ProductsPage/containers/EditProductPage';

const routes = [
  {
    path: 'sales',
    name: 'A venda',
    component: SalesProductsPage,
    layout: PrivateRoute,
    breadcrumb: 'Produtos disponíveis',
  },
  {
    path: 'available',
    name: 'Disponíveis',
    component: AvailableProductsPage,
    layout: PrivateRoute,
    breadcrumb: 'Produtos disponíveis',
  },
  {
    path: 'shipped',
    name: 'Enviados por Sellers',
    component: ShippedBySellersProductsPage,
    layout: PrivateRoute,
    breadcrumb: 'Produtos disponíveis',
  },
];

export default [
  {
    path: '/products',
    exact: true,
    breadcrumb: 'Produtos',
    layout: PrivateRoute,
    menu: {
      icon: 'shop',
      name: 'Produtos',
    },
    children: routes,
  },
  {
    path: '/products/sales',
    exact: true,
    component: SalesProductsPage,
    breadcrumb: 'Produtos a venda',
    layout: PrivateRoute,
  } /* 
  {
    path: '/products/sales/:id',
    exact: true,
    breadcrumb: 'Pedido',
  }, */,
  {
    path: '/products/sales/:id/edit',
    exact: true,
    component: EditProductPage,
    breadcrumb: 'Editar Produto',
    layout: PrivateRoute,
  },
  {
    path: '/products/available',
    exact: true,
    component: AvailableProductsPage,
    breadcrumb: 'Produtos disponíveis',
    layout: PrivateRoute,
  },
  {
    path: '/products/shipped',
    exact: true,
    component: ShippedBySellersProductsPage,
    breadcrumb: 'Produtos Enviados por Sellers',
    layout: PrivateRoute,
  },
];
