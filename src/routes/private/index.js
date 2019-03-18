import home from './homeRoutes';
import orders from './ordersRoutes';
import products from './productsRoutes';

export default [...home, ...orders, ...products];
