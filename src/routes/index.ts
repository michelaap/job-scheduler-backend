import { Router } from 'express';
import schedulingRouter from './scheduling.routes';

const routes = Router();

routes.use('/scheduling', schedulingRouter);

export default routes;
