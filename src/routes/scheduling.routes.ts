import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const schedulingRouter = Router();

interface Scheduling {
  id: string;
  provider: string;
  date: Date;
}

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

  const scheduling = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  scheduler.push(scheduling);

  return res.json(scheduling);
});

export default schedulingRouter;
