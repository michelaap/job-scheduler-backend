import { EntityRepository, Repository } from 'typeorm';

import Scheduling from '../models/Scheduling';

@EntityRepository(Scheduling)
class SchedulingRepository extends Repository<Scheduling> {
  public async findByDate(date: Date): Promise<Scheduling | null> {
    const findScheduling = await this.findOne({
      where: { date },
    });

    return findScheduling || null;
  }
}

export default SchedulingRepository;
