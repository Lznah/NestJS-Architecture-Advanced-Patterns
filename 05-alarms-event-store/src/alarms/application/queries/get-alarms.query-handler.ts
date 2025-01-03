import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './get-alarms.query';
import { Alarm } from '../../domain/alarm';
import { FindAlarmRepository } from '../ports/find-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmRepository) {}

  async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
