import { Router } from 'express';

import schedulingRouter from './scheduling.routes';
import userRouter from './user.routes';
import sessionRouter from './session.routes';

const routes = Router();

routes.use('/schedulings', schedulingRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
