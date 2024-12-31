import { Injectable } from '@nestjs/common';
import { AlarmEntity } from '../entities/alarm.entity';
import { Alarm } from '../../../../domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { FindAlarmRepository } from 'src/alarms/application/ports/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';

@Injectable()
export class InMemoryAlarmRepository implements CreateAlarmRepository, FindAlarmRepository, UpsertMaterializedAlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarms = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarms.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if(this.materializedAlarms.has(alarm.id)) {
      this.materializedAlarms.set(alarm.id, {
        ...this.materializedAlarms.get(alarm.id),
        ...alarm,
      });
      return;
    };
    this.materializedAlarms.set(alarm.id, alarm as AlarmReadModel);
  }
}
