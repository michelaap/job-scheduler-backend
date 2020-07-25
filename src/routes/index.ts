import { Router } from 'express';

import schedulingRouter from './scheduling.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/schedulings', schedulingRouter);
routes.use('/users', userRouter);

export default routes;
