import orders from './ordersRoutes';
import products from './productsRoutes';
import configuration from './configurationRoutes';

export default [...orders, ...products, ...configuration];
