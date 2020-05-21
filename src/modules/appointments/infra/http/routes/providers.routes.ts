import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticade';
import ListProvidersController from '../controllers/ListProvidersController';

const providersRouter = Router();
const providersController = new ListProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
