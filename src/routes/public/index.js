import login from './loginRoutes';
import register from './registerRoutes';
import forgotPassword from './forgotPasswordRoute';

export default [...login, ...register, ...forgotPassword];
