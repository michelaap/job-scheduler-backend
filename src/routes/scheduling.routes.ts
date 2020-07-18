import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Scheduling from '../models/Scheduling';

const schedulingRouter = Router();

const scheduler: Scheduling[] = [];

schedulingRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findSchedulingOnTheSameDate = scheduler.find(s =>
    isEqual(parsedDate, s.date),
  );

  if (findSchedulingOnTheSameDate) {
    return res.status(400).json({ message: 'This time already scheduled' });
  }

  const scheduling = new Scheduling(provider, parsedDate);

  scheduler.push(scheduling);

  return res.json(scheduling);
});

export default schedulingRouter;
