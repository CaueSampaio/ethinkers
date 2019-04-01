import PrivateRoute from '../../views/layouts/PrivateRoute';

import SalesProductsPage from '../../views/containers/ProductsPage/containers/SalesProductsPage';
import AvailableProductsPage from '../../views/containers/ProductsPage/containers/AvailableProductsPage';
import ShippedBySellersProductsPage from '../../views/containers/ProductsPage/containers/ShippedBySellersProductsPage';
import EditProductPage from '../../views/containers/ProductsPage/containers/SalesProductsPage/containers/EditProductPage';
import CreateProductPage from '../../views/containers/ProductsPage/containers/AvailableProductsPage/containers/CreateProductPage';
import EditAvailableProductPage from '../../views/containers/ProductsPage/containers/AvailableProductsPage/containers/EditAvailableProductPage';
import ShippedBySellersProductDetailsPage from '../../views/containers/ProductsPage/containers/ShippedBySellersProductsPage/containers/ShippedBySellersProductDetailsPage';
import SalesProductDetailsPage from '../../views/containers/ProductsPage/containers/SalesProductsPage/containers/SalesProductDetailsPage';
import AvailableProductDetailsPage from '../../views/containers/ProductsPage/containers/AvailableProductsPage/containers/AvailableProductDetailsPage';

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
    path: '/products/sales/:id',
    exact: true,
    component: SalesProductDetailsPage,
    breadcrumb: 'Detalhes do Produto',
    layout: PrivateRoute,
  },
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
    path: '/products/available/create',
    exact: true,
    component: CreateProductPage,
    breadcrumb: 'Cadastrar Produto',
    layout: PrivateRoute,
  },
  {
    path: '/products/available/:id',
    exact: true,
    component: AvailableProductDetailsPage,
    breadcrumb: 'Detalhes do Produto',
    layout: PrivateRoute,
  },
  {
    path: '/products/available/:id/edit',
    exact: true,
    component: EditAvailableProductPage,
    breadcrumb: 'Editar Produto',
    layout: PrivateRoute,
  },
  {
    path: '/products/shipped',
    exact: true,
    component: ShippedBySellersProductsPage,
    breadcrumb: 'Produtos Enviados por Sellers',
    layout: PrivateRoute,
  },
  {
    path: '/products/shipped/:id',
    exact: true,
    component: ShippedBySellersProductDetailsPage,
    breadcrumb: 'Detalhes do Produto',
    layout: PrivateRoute,
  },
];
