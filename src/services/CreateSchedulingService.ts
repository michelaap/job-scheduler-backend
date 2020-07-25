import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Scheduling from '../models/Scheduling';
import SchedulingRepository from '../repositories/SchedulingRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateSchedulingService {
  public async execute({ provider_id, date }: Request): Promise<Scheduling> {
    const schedulingRepository = getCustomRepository(SchedulingRepository);
    const schedulingDate = startOfHour(date);

    const findSchedulingOnTheSameDate = await schedulingRepository.findByDate(
      schedulingDate,
    );

    if (findSchedulingOnTheSameDate) {
      throw Error('This time already scheduled');
    }

    const scheduling = schedulingRepository.create({
      provider_id,
      date: schedulingDate,
    });

    await schedulingRepository.save(scheduling);
    return scheduling;
  }
}

export default CreateSchedulingService;
